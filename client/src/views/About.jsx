import React from "react";
import Button from "react-bootstrap/Button";

const About = () => {
  return (
    <div className="justify-content-center d-flex mt-5">
      <Button
        variant="primary"
        size="lg"
        href="https://github.com/Vannamnguyenn/NoteManagement"
      >
        Download source code in github.com
      </Button>
    </div>
  );
};

export default About;
