import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { getStages, getAreas } from "../data/text";

export function Areas() {
  const areas = getAreas();
  const initialChecked = Array.from(Array(areas.length), () => false);
  const [checked, setChecked] = useState(initialChecked);
  const [text, setText] = useState("");
  function handleCheck(e, idx) {
    setChecked(checked.map((bool, i) => (i === idx ? e.target.checked : bool)));
  }
  return (
    <div>
      {areas.map((area, idx) => (
        <div key={idx}>
          <Typography>
            <Checkbox
              checked={checked[idx]}
              onChange={e => handleCheck(e, idx)}
            />
            {area}
          </Typography>
        </div>
      ))}
      <TextField
        label="Questions or notes for the reviewer..."
        fullWidth
        margin="normal"
        onChange={e => setText(e.target.value)}
        value={text}
        inputProps={{ maxLength: "200" }}
        helperText="Example: Does the third paragraph make sense?"
        multiline
        rows="2"
        rowsMax="3"
        type="text"
      />
    </div>
  );
}

export function Stages() {
  const stages = getStages();
  const [selectedIndex, setSelectedIndex] = useState(1);
  return (
    <div>
      {stages.map((stage, idx) => (
        <Typography key={idx}>
          <Radio
            checked={selectedIndex === idx}
            onChange={() => setSelectedIndex(idx)}
            value={idx}
          />
          {stage}
        </Typography>
      ))}
    </div>
  );
}

export function Doc() {
  const [link, setLink] = useState("");
  return (
    <div>
      <TextField
        label="Enter Google docs link"
        margin="normal"
        onChange={e => setLink(e.target.value)}
        value={link}
        helperText={`ensure "Anyone with link can comment" sharing permission`}
        type="url"
        required
      />
    </div>
  );
}
