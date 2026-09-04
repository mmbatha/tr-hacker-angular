Master Prompt — Recreate the VS Code 60-Minute POC Prompt Harness
Create a complete VS Code GitHub Copilot customization harness for a team that will receive an unknown customer Problem Statement on competition day and has only 60 minutes to create and prepare a working POC demo.
The design must use one custom agent and one agent session only. Do not use specialist custom agents or subagents. The specialist roles must be implemented as Agent Skills that the single Orchestrator applies as perspectives in its current session.
Core workflow
The harness must support three reusable VS Code prompt files.
1. /create-brief
Accept a raw customer Problem Statement through a VS Code prompt input variable.
Preserve the raw Problem Statement verbatim in documentation/PROBLEM_STATEMENT.md.
Generate documentation/BRIEF.md from documentation/BRIEF_TEMPLATE.md.
Apply Product Lead + Coordinator perspectives.
Do not build the POC.
Finish by telling the user to run /execute-brief.
2. /execute-brief
Read the existing documentation/BRIEF.md.
Execute the full 60-minute POC workflow.
Stay entirely in the current Orchestrator session.
Apply role skills as perspectives.
Build, run/test, judge, stabilize and prepare the pitch.
3. /run-poc
This is the preferred competition-day entry point.
Accept the raw Problem Statement.
Save it to documentation/PROBLEM_STATEMENT.md.
Generate documentation/BRIEF.md.
Do not stop for approval.
Immediately execute the brief in the same Orchestrator session.
Complete Problem Statement → Brief → UX → Build → Judge → Pitch → Rehearsal.
All prompt files must:
live under .github/prompts/,
use the .prompt.md extension,
have useful YAML frontmatter,
target agent: Orchestrator,
use ${input:problemStatement:Paste the customer Problem Statement here} for relevant input.
Required structure
.github/
├── copilot-instructions.md
├── agents/
│   └── orchestrator.agent.md
├── prompts/
│   ├── create-brief.prompt.md
│   ├── execute-brief.prompt.md
│   └── run-poc.prompt.md
└── skills/
    ├── product-lead/SKILL.md
    ├── designer/SKILL.md
    ├── developer/SKILL.md
    ├── presenter/SKILL.md
    ├── coordinator/SKILL.md
    ├── devils-advocate-judge/SKILL.md
    ├── problem-discovery/SKILL.md
    ├── mvp-scoping/SKILL.md
    ├── ux-wireframing/SKILL.md
    ├── rapid-prototyping/SKILL.md
    ├── demo-storytelling/SKILL.md
    ├── competition-timeboxing/SKILL.md
    └── judge-readiness/SKILL.md
documentation/
├── PROBLEM_STATEMENT.md
├── BRIEF_TEMPLATE.md
├── BRIEF.md
├── STATUS.md
├── JUDGE.md
└── examples/
    └── FIELD_SERVICE_DEMO_BRIEF.md
README.md
TEAM_RECREATE_PROMPT.md
The Orchestrator may create:
documentation/PRODUCT.md
documentation/UX.md
documentation/TECHNICAL.md
documentation/PITCH.md
Orchestrator
Create exactly one custom agent named Orchestrator.
Its mission is to transform an unknown customer Problem Statement into the strongest demonstrable POC possible in a hard 60-minute timebox.
It must explicitly prohibit:
invoking subagents,
creating subagents,
delegating roles to separate agents,
opening parallel agent sessions.
It must say specialist roles are Agent Skills applied as perspectives within the current session.
It must understand:
/create-brief
/execute-brief
/run-poc
If the user directly supplies a Problem Statement without using a prompt file, behave like /run-poc unless they explicitly request only a brief.
Role skills
Create six role skills.
Product Lead
Focus on the primary user, painful customer problem, user outcome, business value, solution hypothesis, MVP scope, acceptance criteria, assumptions and fighting scope creep.
Designer
Focus on the minimal user journey, information hierarchy, simple wireframes, a 3–5 action happy path, projector-friendly demo UI and clarity over breadth.
Developer
Focus on the fastest reliable implementation, one vertical slice, deterministic demo data, run/test loop, simple architecture, mocking non-essential integrations and demo reliability. Avoid unnecessary infrastructure, abstractions, authentication, databases and external services unless the problem requires them.
Presenter
Focus on Problem → User → Insight → Solution → Demo → Value → Future, a 2–3 minute demo script, click-by-click flow, opening/closing statements, five likely hard judge questions and a fallback if the live demo partially fails.
Coordinator
Focus on the 60-minute clock, critical path, phase changes, blockers, scope cuts, readiness state and protecting pitch/rehearsal time.
Devil's Advocate / Judge
Be constructively adversarial. Evaluate customer fit, actual value, innovation, judging-criteria alignment, technical credibility, unsupported claims, demo fragility and presentation clarity. Return at most 3 prioritized findings per review and never cause unnecessary redesign or scope creep.
Supporting skills
Also create:
problem discovery,
MVP scoping,
UX wireframing,
rapid prototyping,
demo storytelling,
competition timeboxing,
judge readiness.
These are skills, never separate agents.
Brief template
documentation/PROBLEM_STATEMENT.md preserves the raw customer input.
documentation/BRIEF_TEMPLATE.md must contain:
Customer / Business Context
Problem Statement
Primary User
Solution Hypothesis
Primary Demo Happy Path
MVP Acceptance Criteria
Scope — Must Have / Nice to Have / Out of Scope
Proposed POC Experience / UX Direction
Technical Direction
Demo Data / Scenario
Business Value
Innovation Angle
Judging Criteria
Risks and Assumptions
60-Minute Timebox
2–3 Minute Demo Story
Definition of Done
Instruction to the Orchestrator
When generating BRIEF.md:
preserve known facts,
clearly label assumptions,
never invent customer facts as known,
choose exactly one primary happy path,
define 3–5 acceptance criteria,
make the POC realistically achievable in one hour,
label unsupplied business-impact figures as illustrative,
use supplied judging criteria exactly.
If judging criteria are absent, use this clearly labeled working assumption:
Category	Weight
Customer Value	30%
Innovation	30%
Technical Implementation	25%
Presentation	15%
Hard 60-minute workflow
00–05 — Understand + scope
Coordinator + Product Lead:
user,
outcome,
problem,
solution hypothesis,
one happy path,
3–5 acceptance criteria.
Minute 5: scope freeze.
05–10 — UX
Designer:
only required screens/panels,
roughly 3–5 actions,
minimal wireframe.
Minute 10: coding begins.
10–40 — Build
Developer:
inspect workspace,
implement smallest vertical slice,
deterministic local data,
run/test after meaningful changes.
Minute 20: if happy path not visible, cut scope.
Minute 30: if not end-to-end, mock blocking integrations.
Minute 40: feature freeze.
40–47 — Judge + stabilize
Judge:
actual demo only,
max 3 findings,
fix Critical and cheap High-value issues.
47–55 — Pitch
Presenter:
2–3 minute story,
click path,
business value,
five hard judge questions.
55–60 — Rehearse + freeze
Coordinator + Presenter + Judge:
clean-start demo,
no broken happy-path controls,
verify opening/value/closing,
final status READY or READY WITH RISKS.
Minute 55: code freeze except demo-blocking defects.
Scope-cut policy
When behind, cut:
stretch features,
secondary screens,
real integrations that can be mocked,
decorative polish,
architecture/abstractions.
Never cut:
primary happy path,
customer-value explanation,
reliable run path,
final rehearsal.
Demo example
Include a filled practice brief under documentation/examples/FIELD_SERVICE_DEMO_BRIEF.md.
Scenario:
A field-service company has approximately 150 technicians. Technicians sometimes arrive at customer sites without the correct replacement parts, causing repeat visits, travel cost, slower resolution and poor customer experience.
The POC is a Technician Job Preparation Assistant that:
shows scheduled jobs,
shows fault/equipment details,
recommends likely replacement parts,
shows confidence,
explains recommendations,
lets the technician select parts,
marks the job ready.
Use plain HTML/CSS/JavaScript with deterministic local data and no backend for the practice scenario.
Use illustrative judging criteria:
Innovation 30%
Customer Value 30%
Technical Implementation 25%
Presentation 15%
README
Explain:
why there is only one custom agent,
why roles are skills,
where prompts live,
how /create-brief, /execute-brief and /run-poc differ,
why /run-poc is recommended on competition day,
the one-hour timeline,
file structure,
dry-run process,
how to inspect customizations in VS Code,
that prompt files target local VS Code agent sessions.
Also note that VS Code prompt files are manually invoked slash commands under .github/prompts, and that Agent Host sessions do not use prompt files; if moving to Agent Host later, migrate the entry workflow into skills.
Validation
Before finishing:
Exactly one .agent.md file exists.
Exactly three .prompt.md files exist.
No specialist agent files exist.
All role and supporting skills exist.
Operational paths use documentation/.
All prompts target agent: Orchestrator.
Agent and prompts prohibit subagent creation/delegation.
Brief template has all required sections.
The package extracts successfully.
Finally package the entire folder as:
`vscode-60-minute-poc-prompt-harness.zip`

```prompt
Use the contents of the file as a prompt
```