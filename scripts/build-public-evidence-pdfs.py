from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


INK = colors.HexColor("#111111")
MUTED = colors.HexColor("#666663")
PALE = colors.HexColor("#F1F0EC")
ACCENT = colors.HexColor("#728F9B")
WHITE = colors.white


def styles():
    base = getSampleStyleSheet()
    return {
        "kicker": ParagraphStyle(
            "Kicker", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=8,
            leading=11, textColor=ACCENT, spaceAfter=6, uppercase=True,
        ),
        "title": ParagraphStyle(
            "Title", parent=base["Title"], fontName="Helvetica", fontSize=38,
            leading=39, textColor=INK, alignment=TA_LEFT, spaceAfter=18,
        ),
        "deck": ParagraphStyle(
            "Deck", parent=base["Normal"], fontName="Helvetica", fontSize=14,
            leading=20, textColor=INK, spaceAfter=22,
        ),
        "h1": ParagraphStyle(
            "H1", parent=base["Heading1"], fontName="Helvetica", fontSize=24,
            leading=27, textColor=INK, spaceBefore=8, spaceAfter=14,
        ),
        "h2": ParagraphStyle(
            "H2", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=11,
            leading=15, textColor=INK, spaceBefore=8, spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "Body", parent=base["BodyText"], fontName="Helvetica", fontSize=9.5,
            leading=14.5, textColor=INK, spaceAfter=9,
        ),
        "small": ParagraphStyle(
            "Small", parent=base["BodyText"], fontName="Helvetica", fontSize=8,
            leading=12, textColor=MUTED, spaceAfter=6,
        ),
        "metric": ParagraphStyle(
            "Metric", parent=base["Normal"], fontName="Helvetica", fontSize=23,
            leading=25, textColor=INK,
        ),
        "metric_label": ParagraphStyle(
            "MetricLabel", parent=base["Normal"], fontName="Helvetica", fontSize=7.5,
            leading=10, textColor=MUTED,
        ),
    }


def footer(canvas, document):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#D2D0CA"))
    canvas.line(20 * mm, 14 * mm, 190 * mm, 14 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(20 * mm, 9 * mm, "BOWEN MAI - PUBLIC EVIDENCE SUMMARY")
    canvas.drawRightString(190 * mm, 9 * mm, f"{document.page:02d}")
    canvas.restoreState()


def metric_table(items, style):
    cells = []
    for value, label in items:
        cells.append([Paragraph(value, style["metric"]), Paragraph(label, style["metric_label"])])
    table = Table([cells], colWidths=[42.5 * mm] * len(cells))
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 0.6, INK),
        ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#C8C6C0")),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    return table


def content_table(rows, widths, style):
    formatted = []
    for row_index, row in enumerate(rows):
        row_style = style["h2"] if row_index == 0 else style["small"]
        formatted.append([Paragraph(str(value), row_style) for value in row])
    table = Table(formatted, colWidths=widths, repeatRows=1)
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("BOX", (0, 0), (-1, -1), 0.6, INK),
        ("INNERGRID", (0, 1), (-1, -1), 0.35, colors.HexColor("#C8C6C0")),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, PALE]),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return table


def build_library(output_path):
    style = styles()
    document = SimpleDocTemplate(
        str(output_path), pagesize=A4, rightMargin=20 * mm, leftMargin=20 * mm,
        topMargin=20 * mm, bottomMargin=20 * mm, title="Library Evaluation - Public Evidence Summary",
        author="Bowen Mai", subject="Sanitized public portfolio evidence",
    )
    story = [
        Paragraph("INFO20004 / UX RESEARCH", style["kicker"]),
        Paragraph("Unimelb Library Evaluation", style["title"]),
        Paragraph(
            "A privacy-safe summary of a mixed-method usability evaluation. It preserves the study logic, evidence scale and design recommendations while excluding names, student numbers, signatures, participant images, raw records and withdrawn third-party material.",
            style["deck"],
        ),
        metric_table([
            ("14", "online first-impression participants"),
            ("5", "moderated lab participants"),
            ("5", "representative tasks"),
            ("8", "prioritised recommendations"),
        ], style),
        Spacer(1, 14),
        Paragraph("Ownership and contribution", style["h2"]),
        Paragraph(
            "This was a five-person university group project. Bowen Mai contributed to research planning, moderated evaluation work, observation, evidence synthesis and the final report. Concept development, sessions, analysis and submission were shared.",
            style["body"],
        ),
        Paragraph("Publication boundary", style["h2"]),
        Paragraph(
            "This document is a new public summary, not the original submission. The complete unredacted report remains private because the study materials include confidential participant evidence and third-party identifiers.",
            style["body"],
        ),
        PageBreak(),
        Paragraph("01 / STUDY DESIGN", style["kicker"]),
        Paragraph("From first impression to task performance", style["h1"]),
        Paragraph(
            "The online five-second test examined what the Library homepage communicated at a glance. Moderated lab sessions then tested whether students could complete everyday journeys. Completion, time, perceived difficulty, think-aloud comments, observation and gaze behaviour were read together.",
            style["body"],
        ),
        content_table([
            ["Stage", "Purpose", "Evidence"],
            ["First impression", "Check audience, purpose and immediate hierarchy.", "Five-second exposure and short recall questions."],
            ["Task performance", "Test representative library journeys.", "Room booking, APA 7, databases, past exams and journal download."],
            ["Behaviour evidence", "Explain where each pathway broke down.", "Completion, time, difficulty, observation, comments and gaze."],
            ["Design handoff", "Turn findings into actionable priorities.", "Eight recommendations retaining their report identifiers."],
        ], [31 * mm, 65 * mm, 74 * mm], style),
        Spacer(1, 16),
        Paragraph("Scope", style["h2"]),
        Paragraph(
            "The sample was intentionally small and student-focused. The evidence supports a next design iteration, not population-level proof.",
            style["body"],
        ),
        PageBreak(),
        Paragraph("02 / EVIDENCE SYNTHESIS", style["kicker"]),
        Paragraph("Three patterns explain the main friction", style["h1"]),
        content_table([
            ["Observed pattern", "Evidence signal", "Interpretation"],
            ["Room booking became the critical path", "All five lab participants struggled; one did not finish within eight minutes.", "The pathway lacked a clear sequence, progress cues and recovery messages."],
            ["Search results did not confirm relevance", "Four participants were unsure whether the database results answered the task.", "Results existed, but relevance and completion were weakly communicated."],
            ["Visible controls still lacked meaning", "Attention dispersed across icons, fields and status areas.", "Unlabelled controls and hidden eligibility rules forced trial and error."],
        ], [50 * mm, 58 * mm, 62 * mm], style),
        Spacer(1, 16),
        Paragraph("Evidence responsibility", style["h2"]),
        Paragraph(
            "Gaze evidence was used diagnostically alongside observed behaviour and task data. It was not treated as a substitute for performance evidence or as proof about all users.",
            style["body"],
        ),
        PageBreak(),
        Paragraph("03 / DESIGN HANDOFF", style["kicker"]),
        Paragraph("Eight findings became eight interface moves", style["h1"]),
        content_table([
            ["ID", "Recommendation", "Design intent"],
            ["R1", "Guide booking step by step", "Expose sequence and progress before the next stage."],
            ["R2", "Reveal Create Reservation at the right moment", "Make the primary action prominent when applicable."],
            ["R3", "Explain ineligible spaces", "Prevent dead ends with eligibility and recovery messages."],
            ["R4", "Rename Re:Cite", "Use Referencing and Citations for immediate legibility."],
            ["R5", "Confirm the subject match", "Explain why database results match the query."],
            ["R6", "Surface All Filters", "Increase visibility of the control used for past exams."],
            ["R7", "Label utility icons", "Pair functions with words such as Download PDF."],
            ["R8", "Replace the green add icon", "Use an explicit Select Space action."],
        ], [15 * mm, 69 * mm, 86 * mm], style),
        Spacer(1, 14),
        KeepTogether([
            Paragraph("Limitations", style["h2"]),
            Paragraph(
                "The online sample included 14 students and the moderated sample included 5 students. Think-aloud may have affected timing, and the task set focused on common journeys. Recommendations should guide a larger follow-up test.",
                style["body"],
            ),
        ]),
    ]
    document.build(story, onFirstPage=footer, onLaterPages=footer)


def build_feasibility(output_path):
    style = styles()
    document = SimpleDocTemplate(
        str(output_path), pagesize=A4, rightMargin=20 * mm, leftMargin=20 * mm,
        topMargin=20 * mm, bottomMargin=20 * mm, title="Retail Mall Feasibility - Public Evidence Summary",
        author="Bowen Mai", subject="Sanitized public portfolio evidence",
    )
    story = [
        Paragraph("PROP20001 / FINANCIAL MODELLING", style["kicker"]),
        Paragraph("Retail Mall Feasibility", style["title"]),
        Paragraph(
            "A privacy-safe evidence summary of a group feasibility study for a hypothetical 10,000-square-metre Melbourne CBD retail mall. The original report and workbook remain private; this version removes student identifiers and document metadata while preserving the model scope and decision logic.",
            style["deck"],
        ),
        metric_table([
            ("15", "linked model sheets"),
            ("18 mo", "construction schedule"),
            ("10,000", "square metres of leasable space"),
            ("4", "principal stress drivers"),
        ], style),
        Spacer(1, 14),
        Paragraph("Ownership and contribution", style["h2"]),
        Paragraph(
            "This was a four-person university group project. Bowen Mai contributed to model development, scenario analysis, risk synthesis and the final strategic recommendation. Modelling, analysis and submission were shared.",
            style["body"],
        ),
        Paragraph("Publication boundary", style["h2"]),
        Paragraph(
            "The original files contain student identifiers and collaborator metadata. This public derivative is designed for portfolio review and must not be read as a replacement for the submitted academic record.",
            style["body"],
        ),
        PageBreak(),
        Paragraph("01 / MODEL ARCHITECTURE", style["kicker"]),
        Paragraph("A linked view of cost, income and finance", style["h1"]),
        content_table([
            ["Module", "Model purpose", "Representative inputs"],
            ["Assumptions", "Centralise editable project and market drivers.", "Land, construction, soft costs, lease mix, occupancy, inflation and discount rate."],
            ["Construction cash flow", "Stage capital deployment across the build period.", "Land at inception, soft costs and an 18-month construction schedule."],
            ["Revenue and operating costs", "Translate tenancy and escalation into annual operating evidence.", "Anchor and specialty rents, occupancy ramp, ancillary income and operating expense."],
            ["Debt schedule", "Separate interest, principal and closing balance.", "Five-year loan, interest rate and annual payment."],
            ["Sensitivity and risk", "Test the assumptions that can change the decision.", "Occupancy, rent, construction overrun, delay and competition."],
        ], [42 * mm, 64 * mm, 64 * mm], style),
        Spacer(1, 15),
        Paragraph("Transparent baseline assumptions", style["h2"]),
        content_table([
            ["Input", "Submitted assumption", "Use in public extract"],
            ["Total capital", "AUD 22.0 million", "Land, construction and soft-cost structure."],
            ["Leasable area", "10,000 sqm", "30% anchor and 70% specialty tenants."],
            ["Opening occupancy", "80%", "Rises by 5 percentage points to a 95% cap."],
            ["Rent escalation", "2.5% per year", "Applied consistently to both tenant types."],
            ["Ancillary income", "10% of rental income", "Advertising and parking proxy."],
        ], [48 * mm, 48 * mm, 74 * mm], style),
        PageBreak(),
        Paragraph("02 / DECISION DISCIPLINE", style["kicker"]),
        Paragraph("Show the drivers without overstating precision", style["h1"]),
        Paragraph(
            "The model's useful contribution is its linked structure: changes to occupancy, rent, cost and schedule flow through the revenue, financing and sensitivity views. The public workbook therefore exposes a compact, formula-driven revenue extract and a visible audit register rather than repeating unreconciled headline outputs.",
            style["body"],
        ),
        content_table([
            ["Driver", "Why it matters", "Control or response"],
            ["Occupancy", "Compounds across annual rental and ancillary income.", "Phase leasing targets and track the ramp against scenario thresholds."],
            ["Anchor and specialty rent", "Sets the weighted rental base and changes demand sensitivity.", "Use pre-commitments and transparent tenant-mix assumptions."],
            ["Construction overrun", "Raises capital need before the asset produces income.", "Use contingency, fixed-price packages and milestone control."],
            ["Schedule delay", "Defers revenue while financing and holding costs continue.", "Link programme milestones to drawdown and pre-leasing decisions."],
        ], [43 * mm, 63 * mm, 64 * mm], style),
        Spacer(1, 16),
        Paragraph("Later audit finding", style["h2"]),
        Paragraph(
            "NPV and IRR values were not consistent across every sheet and the written report. The website and public workbook disclose this limitation and do not present any submitted headline NPV or IRR as a verified fact.",
            style["body"],
        ),
        PageBreak(),
        Paragraph("03 / PUBLIC EVIDENCE", style["kicker"]),
        Paragraph("What the downloadable workbook contains", style["h1"]),
        content_table([
            ["Sheet", "Content", "Evidence status"],
            ["Overview", "Purpose, attribution, publication boundary and model map.", "Portfolio summary."],
            ["Assumptions", "Selected inputs disclosed in the submitted report.", "Editable input record."],
            ["Revenue Extract", "Formula-driven occupancy, rent, revenue and illustrative NOI.", "Transparent partial calculation, not a feasibility conclusion."],
            ["Audit Register", "Share checks, input checks and the unreconciled return-metric warning.", "Visible limitation and quality-control record."],
        ], [42 * mm, 76 * mm, 52 * mm], style),
        Spacer(1, 16),
        Paragraph("Limitation", style["h2"]),
        Paragraph(
            "This public derivative does not contain the full original model, collaborator metadata, local file paths, student numbers or the unverified return outputs. The complete source remains in the owner's private archive.",
            style["body"],
        ),
    ]
    document.build(story, onFirstPage=footer, onLaterPages=footer)


def main():
    output_dir = Path(__file__).resolve().parents[1] / "files"
    output_dir.mkdir(parents=True, exist_ok=True)
    build_library(output_dir / "unimelb-library-evaluation-public-summary.pdf")
    build_feasibility(output_dir / "financial-feasibility-public-summary.pdf")


if __name__ == "__main__":
    main()
