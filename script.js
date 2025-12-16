let resumeText = "";

// Skill database (rule-based logic)
const roles = {
  frontend: ["html", "css", "javascript", "react", "responsive", "api"],
  backend: ["node", "express", "mongodb", "api", "authentication"],
  data: ["python", "sql", "excel", "statistics", "power bi"]
};

// Read resume file
document.getElementById("resumeInput").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    resumeText = reader.result.toLowerCase();
  };
  reader.readAsText(file);
});

// Analyze resume
document.getElementById("analyzeBtn").addEventListener("click", function () {
  const role = document.getElementById("roleSelect").value;

  if (!resumeText || !role) {
    alert("Please upload resume and select role");
    return;
  }

  const matched = [];
  const missing = [];

  roles[role].forEach(skill => {
    resumeText.includes(skill)
      ? matched.push(skill)
      : missing.push(skill);
  });

  // Resume score
  const score = Math.round((matched.length / roles[role].length) * 100);

  // Section check
  const sections = ["education", "skills", "experience", "projects"];
  const missingSections = sections.filter(
    section => !resumeText.includes(section)
  );

  displayResults(score, matched, missing, missingSections);
});

// Display results
function displayResults(score, matched, missing, sections) {
  document.getElementById("results").classList.remove("hidden");

  document.getElementById("score").textContent = score;

  document.getElementById("matchedSkills").innerHTML =
    matched.map(skill => `<li>${skill}</li>`).join("");

  document.getElementById("missingSkills").innerHTML =
    missing.map(skill => `<li>${skill}</li>`).join("");

  document.getElementById("missingSections").innerHTML =
    sections.length
      ? sections.map(sec => `<li>${sec}</li>`).join("")
      : "<li>None 🎉</li>";
}
