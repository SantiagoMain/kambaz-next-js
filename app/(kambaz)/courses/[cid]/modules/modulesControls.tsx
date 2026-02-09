import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "react-bootstrap";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* The + Module Button (Red) */}
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      {/* The Publish All Dropdown using explicit sub-components */}
      <Dropdown className="float-end me-1">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark />
          Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark />
            Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark />
            Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* View Progress Button */}
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">
        View Progress
      </Button>

      {/* Collapse All Button */}
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-collapse-all">
        Collapse All
      </Button>
    </div>
  );
}