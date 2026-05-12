import { Fields } from "./scripts/components/Fields.js";
import { ProjectList } from "./scripts/components/ProjectList.js";
import { Popup } from "./scripts/components/Pupup.js";
import "./sass/main.scss";
new Fields();
new ProjectList("Initial");
new ProjectList("Active");
new ProjectList("Finished");
new Popup();
