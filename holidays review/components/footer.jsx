import React from "react";

function Footer() {
  return (
    <div>
      <footer style={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <p>
          <a href="https://jigsaw.w3.org/css-validator/check/referer">
            <img
              style={styles.imgf}
              src="https://jigsaw.w3.org/css-validator/images/vcss"
              alt="Valid CSS!"
            />
          </a>
        </p>
      </footer>
    </div>
  );
}

export { Footer };

const styles = {
  footer: {
    backgroundColor: "#f79c26",
    textAlign: "center",
    padding: "1rem",
    left: "0",
    bottom: "0",
    width: "100%",
    flex: "1",
  },
  imgf: {
    border: "0",
    width: "88px",
    height: "31px",
  },
};
