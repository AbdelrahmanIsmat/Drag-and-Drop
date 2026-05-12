import { Fields } from "./scripts/components/Fields";
import { ProjectList } from "./scripts/components/ProjectList";
import { Popup } from "./scripts/components/Pupup";
import "./sass/main.scss";
new Fields();
new ProjectList("Initial");
new ProjectList("Active");
new ProjectList("Finished");
new Popup();
