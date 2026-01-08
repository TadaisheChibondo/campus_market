import React from "react";

function About() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "#2563eb", textAlign: "center" }}>
        About the Developer
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {/* Profile Picture Placeholder */}
        {/* Profile Picture */}
        <img
          src="/my-photo.jpg"
          alt="Tadaishe Chibondo"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit:
              "cover" /* This ensures your face isn't stretched if the photo is rectangular */,
            marginBottom: "20px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        />
        <h2>Tadaishe Chibondo</h2>
        <p style={{ fontSize: "1.2rem", color: "#6b7280" }}>
          Full Stack Developer | Tech Enthusiast | Problem Solver | Quant trader
        </p>

        <p
          style={{ textAlign: "center", lineHeight: "1.6", marginTop: "10px" }}
        >
          Hello <strong>CampusMarket</strong> Is meant to connect Students on
          campus and allow them to buy and sell goods, between themselves. This
          project was developed using
          <strong>React, Django, and PostgreSQL</strong>.
        </p>

        <hr
          style={{
            width: "100%",
            margin: "20px 0",
            border: "1px solid #f3f4f6",
          }}
        />

        <h3>Connect with Me</h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <a
            href="https://www.linkedin.com/in/tadaishe-chibondo-915247349?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/TadaisheChibondo"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            GitHub
          </a>
          <a
            href="https://tadaishe-portfolio.onrender.com/"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
