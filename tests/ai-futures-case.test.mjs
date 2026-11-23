import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { loadPortfolio } from "../scripts/load-portfolio.mjs";

test("the course case renders the four forecasts, five futures-cone positions and three concepts in each language", () => {
  const { PORTFOLIO_I18N, CaseComponents } = loadPortfolio();
  const labels = new Set();

  for (const language of ["en", "zh", "ja"]) {
    const project = PORTFOLIO_I18N[language].projects["ai-futures"];
    const { forecasts, cone, concepts, reflection } = project.futuresStudy;
    const html = CaseComponents.futuresStudy(project);
    assert.equal(forecasts.items.length, 4);
    assert.equal(cone.items.length, 5);
    assert.equal(concepts.items.length, 3);
    const board = CaseComponents.futuresForecasts(project);
    assert.ok(board.includes(forecasts.title));
    const cards = [...board.matchAll(/<article class="forecast-card">([\s\S]*?)<\/article>/g)];
    assert.equal(cards.length, 4);
    for (const [index, { key, title, ai, human, alt }] of forecasts.items.entries()) {
      const card = cards[index][1];
      for (const phrase of [title, ai, human, alt, forecasts.aiLabel, forecasts.humanLabel]) {
        assert.ok(phrase.trim() && card.includes(phrase), `Incomplete ${language} card: ${key}`);
      }
      assert.ok(card.includes(`/${key}.webp`));
      assert.ok(card.includes(`aip-future-scenario.pdf#page=${index + 3}"`));
    }
    for (const collection of [cone, concepts]) {
      assert.ok(html.includes(collection.title), `${language} is missing a section heading`);
      for (const [title, body] of collection.items) {
        assert.ok(body.trim().length > 0);
        assert.ok(html.includes(title), `${language} is missing ${title}`);
      }
    }
    assert.ok(html.includes(reflection.title), `${language} is missing the student's reflection`);
    labels.add(forecasts.title);
  }
  assert.equal(labels.size, 3, "the forecasts have a separate localized heading in each edition");
});

test("the futures essay connects its illustrations and numbered citations to local evidence", () => {
  const { PORTFOLIO_PROJECTS, CaseComponents } = loadPortfolio();
  const project = PORTFOLIO_PROJECTS.find((entry) => entry.id === "ai-futures");
  const html = CaseComponents.futuresForecasts(project) + CaseComponents.futuresStudy(project);
  const images = Array.from(html.matchAll(/<img\b[^>]*?src="([^"]+)"/g), (match) => match[1]);
  assert.equal(new Set(images).size, 7);
  for (const src of images) assert.ok(fs.statSync(src).size > 0);

  const citedDocuments = new Set(Array.from(html.matchAll(/href="([^"]+\.pdf)#page=[1-9]\d*"/g), (match) => match[1]));
  assert.deepEqual([...citedDocuments].sort(), Array.from(project.sources, (source) => source.href).sort());
});

test("the research notes show participation, disclosure comparisons and the proposed study in reading order", () => {
  const { PORTFOLIO_I18N, CaseComponents } = loadPortfolio();
  const localizedTitles = new Set();
  for (const language of ["en", "zh", "ja"]) {
    const project = PORTFOLIO_I18N[language].projects["ai-futures"];
    const { platform, participation, cone, concepts, statements, studyPlan, reflection } = project.futuresStudy;
    const html = CaseComponents.futuresStudy(project);
    const sections = [...html.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)].map(match =>
      match[1].replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&"));
    function sectionFor({ title }) {
      const index = sections.findIndex(section => section.includes(`<h2>${title}</h2>`));
      assert.notEqual(index, -1, `Missing section in ${language}: ${title}`);
      return index;
    }
    assert.equal(sectionFor(participation), sectionFor(platform) + 1);
    assert.equal(sectionFor(cone), sectionFor(participation) + 1);
    assert.equal(sectionFor(statements), sectionFor(concepts) + 1);
    assert.equal(sectionFor(studyPlan), sectionFor(statements) + 1);
    assert.equal(sectionFor(reflection), sectionFor(studyPlan) + 1);
    const finalSection = sections[sectionFor(reflection)];
    assert.ok(reflection.editionNote.trim() && finalSection.indexOf(reflection.editionNote) > finalSection.indexOf(reflection.body));
    assert.match(html, /id="futures-statements" tabindex="-1"/);
    assert.equal(participation.items.length, 4);
    assert.equal(studyPlan.items.length, 3);
    for (const section of [participation, statements, studyPlan]) {
      const content = sections[sectionFor(section)];
      for (const phrase of [section.label, section.body, ...(section.items || []).flat()]) {
        assert.ok(phrase.trim() && content.includes(phrase), `Missing research text in ${language}: ${phrase}`);
      }
    }
    assert.equal(statements.examples.length, 2);
    const examples = [...sections[sectionFor(statements)].matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)];
    assert.equal(examples.length, statements.examples.length);
    for (const [index, example] of statements.examples.entries()) {
      const content = examples[index][1];
      for (const phrase of [example.title, example.situation, statements.shortLabel, example.brief, statements.detailLabel, example.detailed, example.note]) {
        assert.ok(phrase.trim() && content.includes(phrase), `Incomplete ${language} statement: ${example.title}`);
      }
      for (const { sourceIndex, page, label } of [example.cite, example.contextCite]) {
        assert.ok(content.includes(`${project.sources[sourceIndex].href}#page=${page}"`));
        assert.ok(content.includes(label));
      }
    }
    for (const { sourceIndex, page } of participation.citations) {
      assert.ok(sections[sectionFor(participation)].includes(`${project.sources[sourceIndex].href}#page=${page}"`));
    }
    localizedTitles.add(statements.title);
  }
  assert.equal(localizedTitles.size, 3);
});
