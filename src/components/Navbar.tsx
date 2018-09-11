import { Icon } from "@blueprintjs/core";
import { NavbarMenu } from "components/NavbarMenu";
import { NavbarUserSection } from "components/NavbarUserSection";
import * as React from "react";

export class Navbar extends React.Component<{}> {
  public render() {
    return (
      <div className="navbar">
        <h1 className="bp3-heading brand"><Icon icon="git-new-branch" iconSize={30} /> Nibble</h1>
        <NavbarMenu />
        <NavbarUserSection />
      </div>
    );
  }
}
