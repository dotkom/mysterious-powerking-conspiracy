import { Card, Elevation, Icon } from "@blueprintjs/core";
import { NavbarUserSection } from "components/NavbarUserSection";
import * as React from "react";

export const Navbar = () => (
  <div className="navbar">
    <h1 className="bp3-heading brand"><Icon icon="git-new-branch" iconSize={30} /> Nibble</h1>
    <Card elevation={Elevation.ONE}>
      <div className="menu">
        <h3 className="bp3-heading">Meny</h3>
        <ul className="bp3-list bp3-list-unstyled">
          <li>
            <a href="#">Hjelp</a>
          </li>
          <li>
            <a href="#">Rapporter en bug</a>
          </li>
        </ul>
      </div>
    </Card>
    <Card elevation={Elevation.ONE}>
      <NavbarUserSection />
    </Card>
  </div>
);
