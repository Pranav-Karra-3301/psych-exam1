import { useState, useCallback, useEffect } from "react";

const CARDS = [
  { q: "How is psychology defined?", a: "The scientific study of behavior and mental processes." },
  { q: "What is the Head vs Heart debate?", a: "A debate about whether the mind resides in the brain (head) or the heart. Plato & Hippocrates supported the head; Aristotle supported the heart (cardiac hypothesis)." },
  { q: "What is the Cardiac Hypothesis?", a: "Aristotle's belief that the heart was the seat of the mind/soul, and the brain merely cooled the blood." },
  { q: "What was Plato's Tripartite Theory?", a: "The soul has three parts: Reason (head), Spirit/emotion (chest), and Appetite/desire (abdomen)." },
  { q: "What is trepanation?", a: "An ancient practice of drilling holes in the skull, believed to release evil spirits causing mental illness." },
  { q: "What did Egyptian mythology say about the mind?", a: "Egyptians believed the heart was the seat of intelligence and emotion; they discarded the brain during mummification." },
  { q: "What is Humoral Theory?", a: "Hippocrates' idea that the body contained four humors (blood, yellow bile, black bile, phlegm) and imbalances caused illness and personality differences." },
  { q: "Who was Hippocrates?", a: "Ancient Greek physician who proposed the Medical Model — diseases (including mental illness) have natural, physical causes, not supernatural ones. Also proposed humoral theory." },
  { q: "Who was Claudius Galen?", a: "Roman physician who expanded on humoral theory and linked the four humors to four temperaments (sanguine, choleric, melancholic, phlegmatic)." },
  { q: "What is Ventricular Theory?", a: "The medieval idea that mental functions were located in the fluid-filled ventricles of the brain, not the brain tissue itself." },
  { q: "What is the Localization vs Holism debate?", a: "Whether specific brain functions are located in specific areas (localization) or the brain works as a whole (holism)." },
  { q: "Who was Franz Gall?", a: "Proposed phrenology — the idea that bumps on the skull reflect brain areas and personality traits. A (flawed) localization supporter." },
  { q: "What is phrenology?", a: "Franz Gall's pseudoscientific idea that personality traits can be determined by feeling bumps on the skull." },
  { q: "Who was Marie Jean-Pierre Flourens?", a: "Used ablation (removing brain parts in animals) and found the brain could recover function — supporting holism." },
  { q: "Who were Gustav Fritsch & Edward Hitzig?", a: "Used electrical stimulation on dog brains and discovered specific areas controlled specific movements — supporting localization." },
  { q: "Who were Paul Broca & Patient Tan?", a: "Broca studied patient 'Tan' who could only say 'tan.' Damage found in left frontal lobe → Broca's area (speech production). Strong evidence for localization." },
  { q: "How did Descartes think the body and mind interacted?", a: "Dualism — the mind (nonphysical) and body (physical) are separate substances that interact through the pineal gland." },
  { q: "What is Dualism?", a: "Descartes' idea that the mind and body are fundamentally different substances but interact with each other." },
  { q: "Who was Wilhelm Wundt?", a: "Opened the first psychology laboratory in Leipzig, Germany (1879). Often called the father of psychology. Used introspection." },
  { q: "What is introspection?", a: "The process of looking inward and reporting on one's own conscious experiences. Used by Wundt and Titchener." },
  { q: "What is structuralism?", a: "Founded by Edward Titchener (based on Wundt's work). Aimed to break down consciousness into its basic elements using objective introspection." },
  { q: "Who was Edward Titchener?", a: "Wundt's student who established structuralism — the attempt to analyze the structure of conscious experience." },
  { q: "What are criticisms of introspection?", a: "Too subjective, not reliably replicable, results varied between individuals, and people can't always accurately report their own mental processes." },
  { q: "Who is most accurately the father of psychology?", a: "Wilhelm Wundt — for establishing the first psychology lab and making psychology a formal, separate scientific discipline." },
  { q: "What is functionalism and who established it?", a: "William James. Focused on how and why the mind functions — the purpose of behavior and mental processes. Influenced by Darwin." },
  { q: "Who was William James?", a: "Established functionalism. Focused on the purpose and function of consciousness rather than its structure." },
  { q: "Who established the psychodynamic approach?", a: "Sigmund Freud. Focuses on unconscious motivations, early childhood experiences, and internal conflicts driving behavior." },
  { q: "What is psychoanalysis / psychodynamic perspective?", a: "Freud's approach emphasizing the unconscious mind, childhood experiences, and internal conflicts in shaping behavior and personality." },
  { q: "What was hysteria in Freud's context?", a: "Patients showed physical symptoms (paralysis, blindness) with no physical cause. Freud believed it was caused by repressed unconscious conflicts." },
  { q: "Differentiate Freud's three aspects of personality.", a: "Id: primitive desires, pleasure principle (immediate gratification).\nEgo: the 'referee,' reality principle (mediates id & superego).\nSuperego: moral conscience, internalized societal rules." },
  { q: "What is the Unconscious Mind (Freud)?", a: "The largest part of the mind — contains repressed memories, desires, and thoughts we're not aware of but that influence behavior." },
  { q: "What is the Preconscious Mind?", a: "Thoughts and memories not currently in awareness but that can be brought to consciousness with effort (e.g., your phone number)." },
  { q: "What is the Subconscious Mind?", a: "Often used interchangeably with the unconscious — mental processes occurring below conscious awareness." },
  { q: "What are Freudian Slips?", a: "Errors in speech or memory that Freud believed revealed unconscious thoughts or desires (e.g., calling your teacher 'Mom')." },
  { q: "What are defense mechanisms?", a: "Unconscious strategies the ego uses to protect itself from anxiety caused by conflicts between the id and superego." },
  { q: "Defense Mechanism: Denial", a: "Refusing to accept reality or facts.\nEx: A person diagnosed with cancer insists they are healthy." },
  { q: "Defense Mechanism: Displacement", a: "Redirecting emotions from a threatening target to a safer one.\nEx: Yelling at your dog after a bad day at work." },
  { q: "Defense Mechanism: Projection", a: "Attributing your own unacceptable thoughts/feelings to someone else.\nEx: A cheating partner accuses their spouse of cheating." },
  { q: "Defense Mechanism: Reaction Formation", a: "Behaving the opposite way of how you truly feel.\nEx: Being overly nice to someone you actually dislike." },
  { q: "How does the Rorschach test relate to psychodynamic ideas?", a: "It's a projective test — ambiguous inkblots are shown and responses supposedly reveal unconscious thoughts, conflicts, and personality traits." },
  { q: "Who is associated with behaviorism?", a: "B.F. Skinner (and John B. Watson). Focused only on observable, measurable behavior. Rejected studying internal mental states." },
  { q: "What is behaviorism?", a: "Psychology should study only observable behavior, not internal mental processes. Behavior is shaped by the environment (reinforcement & punishment)." },
  { q: "What is the Biological Approach?", a: "Explains behavior through genetics, neurotransmitters, hormones, brain structures, and evolution." },
  { q: "What is the Humanistic Approach?", a: "Focuses on free will, self-actualization, and the inherent goodness of people. Associated with Maslow and Rogers." },
  { q: "What is the Cognitive Approach?", a: "Studies internal mental processes — thinking, memory, perception, problem-solving, language, and decision-making." },
  { q: "What is the Developmental Approach?", a: "Studies how people change (physically, cognitively, socially) across the lifespan — from conception to death." },
  { q: "What is the Socio-cultural Approach?", a: "Examines how social and cultural factors (norms, ethnicity, gender, SES) influence behavior and mental processes." },
  { q: "What are the steps of the scientific method?", a: "1. Observe & ask a question\n2. Form a hypothesis\n3. Test the hypothesis\n4. Collect & analyze data\n5. Draw conclusions\n6. Report / replicate results" },
  { q: "What is a theory?", a: "A general explanation of observations or facts, supported by evidence. Theories generate testable hypotheses." },
  { q: "What is a hypothesis?", a: "A specific, testable prediction derived from a theory about the relationship between variables." },
  { q: "Theory vs Hypothesis — how do they relate?", a: "Theory = broad explanation. Hypothesis = specific testable prediction from that theory. Research tests hypotheses to support or refute the theory." },
  { q: "Population vs Sample?", a: "Population = the entire group you want to study.\nSample = the smaller subset actually selected. Should be representative of the population." },
  { q: "What concerns exist about sample selection?", a: "Sample should be representative. Random sampling helps avoid bias. A biased sample limits generalizability." },
  { q: "What is descriptive research?", a: "Methods that observe and describe behavior without manipulating variables. Includes observation, surveys, and case studies." },
  { q: "Advantages of observational research?", a: "Observe natural behavior, good for generating hypotheses, no manipulation of variables." },
  { q: "Disadvantages of observational research?", a: "Observer bias, can't determine causation, reactivity (people behave differently when watched), time-consuming." },
  { q: "What is a participant observation?", a: "The researcher becomes part of the group being studied to observe behavior from the inside." },
  { q: "Pros and cons of surveys?", a: "Pros: Large data quickly, relatively cheap.\nCons: People may lie/misremember, wording bias, low response rates, self-report bias." },
  { q: "When might you use a case study?", a: "When studying rare or unique conditions in depth (e.g., brain injuries). Rich detail but can't be generalized." },
  { q: "What is a variable?", a: "Anything that can change or vary in a study (e.g., age, test scores, sleep)." },
  { q: "What is a correlation coefficient?", a: "A number from −1.00 to +1.00 describing the strength and direction of the relationship between two variables." },
  { q: "How can you tell if a correlation is strong or weak?", a: "Closer to ±1.00 = stronger. Closer to 0 = weaker.\nEx: r = +0.89 is strong; r = +0.12 is weak." },
  { q: "What does a positive correlation mean?", a: "Both variables move in the same direction — as one increases, the other increases too." },
  { q: "What does a negative correlation mean?", a: "Variables move in opposite directions — as one increases, the other decreases." },
  { q: "Why doesn't correlation imply causation?", a: "A relationship doesn't mean one causes the other. A confounding variable could explain it, or it could be coincidence (spurious correlation)." },
  { q: "What is a spurious correlation?", a: "A correlation that appears meaningful but is caused by coincidence or a confounding variable (e.g., ice cream sales and drowning)." },
  { q: "What is a confounding variable?", a: "An unmeasured variable that influences both the IV and DV, potentially providing an alternative explanation." },
  { q: "How do experiments hold an advantage over correlations?", a: "Experiments manipulate variables and use control groups, allowing researchers to establish cause and effect." },
  { q: "What is an experimental design?", a: "The researcher manipulates an IV, measures its effect on a DV, while controlling other factors." },
  { q: "What is the independent variable (IV)?", a: "The variable the researcher manipulates or changes to see its effect." },
  { q: "What is the dependent variable (DV)?", a: "The variable that is measured — the outcome that may change in response to the IV." },
  { q: "What is the control group?", a: "The group that does NOT receive the treatment. Serves as a baseline for comparison." },
  { q: "What is the experimental group?", a: "The group that DOES receive the experimental treatment (the IV)." },
  { q: "Hypothetical experimental design example?", a: "Does caffeine improve test scores?\nIV: caffeine (given or not)\nDV: test score\nExperimental: drinks coffee\nControl: drinks water" },
  { q: "What is the placebo effect?", a: "Participants improve simply because they believe they're receiving treatment, even though they aren't." },
  { q: "What is the nocebo effect?", a: "Participants experience negative side effects simply because they expect them, even without actual treatment. Opposite of placebo." },
  { q: "What is experimenter effect/bias?", a: "The researcher's expectations or behavior unintentionally influence participants' responses or results." },
  { q: "What is participant effect/bias?", a: "Participants change behavior because they know they're being studied (e.g., trying to guess the hypothesis)." },
  { q: "What is a double-blind study?", a: "Neither participants nor researchers know who is in which group. Reduces both experimenter and participant bias." },
  { q: "What can reduce bias in experiments?", a: "Random assignment, double-blind procedures, placebos for control group, and standardized procedures." },
];

const TOTAL = CARDS.length;

export default function App() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [mode, setMode] = useState("study");
  const [shuffled, setShuffled] = useState(false);
  const [order, setOrder] = useState([...Array(TOTAL).keys()]);

  const deck = mode === "review" ? [...unknown] : order;
  const current = deck[idx];
  const card = current !== undefined ? CARDS[current] : null;
  const deckLen = deck.length;
  const pct = TOTAL > 0 ? Math.round((known.size / TOTAL) * 100) : 0;

  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const go = useCallback((dir) => {
    setIdx(i => {
      const n = i + dir;
      if (n >= 0 && n < deckLen) { setFlipped(false); return n; }
      return i;
    });
  }, [deckLen]);

  const mark = useCallback((type) => {
    if (type === "known") {
      setKnown(p => new Set(p).add(current));
      setUnknown(p => { const s = new Set(p); s.delete(current); return s; });
    } else {
      setUnknown(p => new Set(p).add(current));
      setKnown(p => { const s = new Set(p); s.delete(current); return s; });
    }
    go(1);
  }, [current, go]);

  useEffect(() => {
    const h = (e) => {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "d") go(1);
      else if (e.key === "ArrowLeft" || e.key === "a") go(-1);
      else if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); setFlipped(f => !f); }
      else if (e.key === "1") mark("known");
      else if (e.key === "2") mark("unknown");
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go, mark]);

  const toggleShuffle = () => {
    setOrder(shuffled ? [...Array(TOTAL).keys()] : shuffle([...Array(TOTAL).keys()]));
    setShuffled(s => !s);
    setIdx(0); setFlipped(false);
  };

  const reset = () => { setKnown(new Set()); setUnknown(new Set()); setIdx(0); setFlipped(false); setMode("study"); };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f7", fontFamily: "-apple-system, 'Inter', system-ui, sans-serif", color: "#1a1a1a" }}>
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "48px 20px 80px" }}>

        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 21, fontWeight: 600, margin: 0, letterSpacing: "-0.03em" }}>Psych Exam Review</h1>
          <p style={{ fontSize: 13, color: "#999", margin: "6px 0 0" }}>{TOTAL} cards · History & Perspectives · Research Methods</p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#aaa", marginBottom: 6 }}>
            <span>{known.size} known</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
            <span>{unknown.size} missed</span>
          </div>
          <div style={{ height: 2, background: "#e6e6e4", borderRadius: 1 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "#1a1a1a", borderRadius: 1, transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
          {mode === "study" ? (
            <Pill onClick={() => { if (unknown.size > 0) { setMode("review"); setIdx(0); setFlipped(false); } }} disabled={unknown.size === 0} active={false}>
              Review missed · {unknown.size}
            </Pill>
          ) : (
            <Pill onClick={() => { setMode("study"); setIdx(0); setFlipped(false); }} active>← All cards</Pill>
          )}
          <Pill onClick={toggleShuffle} active={shuffled}>{shuffled ? "✓ Shuffled" : "Shuffle"}</Pill>
          <Pill onClick={reset}>Reset</Pill>
        </div>

        {/* Card area */}
        {!card ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <p style={{ fontSize: 17, fontWeight: 500 }}>All done!</p>
            <p style={{ fontSize: 13, color: "#999", marginTop: 4 }}>No cards left to review.</p>
          </div>
        ) : (
          <>
            <div
              onClick={() => setFlipped(f => !f)}
              style={{
                background: "#fff",
                border: "1px solid #eaeae8",
                borderRadius: 14,
                padding: "44px 32px 40px",
                minHeight: 200,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                userSelect: "none",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              }}
            >
              <span style={{
                position: "absolute", top: 18, left: 24,
                fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                color: flipped ? "#22863a" : "#c0c0bc",
              }}>
                {flipped ? "Answer" : "Question"}
              </span>

              <p style={{
                fontSize: 16, lineHeight: 1.75, margin: 0,
                whiteSpace: "pre-line",
                color: flipped ? "#2b2b2b" : "#1a1a1a",
                fontWeight: flipped ? 400 : 500,
              }}>
                {flipped ? card.a : card.q}
              </p>

              <span style={{
                position: "absolute", bottom: 16, right: 24,
                fontSize: 10, color: "#d5d5d0",
              }}>
                space to flip
              </span>
            </div>

            {/* Nav row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, gap: 12 }}>
              <NavBtn onClick={() => go(-1)} disabled={idx === 0}>←</NavBtn>
              <span style={{ fontSize: 13, color: "#bbb", fontVariantNumeric: "tabular-nums", minWidth: 60, textAlign: "center" }}>{idx + 1} / {deckLen}</span>
              <NavBtn onClick={() => go(1)} disabled={idx >= deckLen - 1}>→</NavBtn>
            </div>

            {/* Mark buttons */}
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <ActionBtn onClick={() => mark("known")} bg="#f2f9f4" border="#cfe8d4" color="#1a7f37">Got it · 1</ActionBtn>
              <ActionBtn onClick={() => mark("unknown")} bg="#fef5f5" border="#f5d0d0" color="#cf222e">Study more · 2</ActionBtn>
            </div>

            <p style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: "#d0d0cc", letterSpacing: "0.02em" }}>
              ← → navigate · space flip · 1 got it · 2 study more
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Pill({ onClick, disabled, active, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "6px 14px", borderRadius: 100,
      border: active ? "1px solid #1a1a1a" : "1px solid #ddd",
      background: active ? "#1a1a1a" : "#fff",
      color: active ? "#fff" : "#777",
      fontSize: 12, fontWeight: 500, cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.3 : 1, transition: "all 0.15s", whiteSpace: "nowrap",
    }}>{children}</button>
  );
}

function NavBtn({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: 44, height: 44, borderRadius: 10,
      border: "1px solid #eaeae8", background: "#fff",
      color: "#1a1a1a", fontSize: 16, fontWeight: 500,
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.2 : 1, transition: "all 0.15s",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>{children}</button>
  );
}

function ActionBtn({ onClick, bg, border, color, children }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: "13px 0", borderRadius: 10,
      border: `1px solid ${border}`, background: bg,
      color, fontWeight: 600, fontSize: 14, cursor: "pointer",
      transition: "all 0.15s",
    }}>{children}</button>
  );
}
