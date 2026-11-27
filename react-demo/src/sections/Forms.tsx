import {
  CatCheckbox,
  CatFormGroup,
  CatInput,
  CatRadio,
  CatRadioGroup,
  CatSelect,
  CatTag,
  CatTextarea,
  CatToggle
} from '@haiilo/catalyst-react';
import React, { useEffect, useRef, useState } from 'react';
import { countryConnector } from '../countries';
import { Value } from '../Section';

const alignments = ['top', 'center', 'bottom'] as const;

export function InputDemo() {
  const [text, setText] = useState('aaa');
  const [password, setPassword] = useState('');
  const [files, setFiles] = useState<string[]>([]);

  return (
    <>
      <div className="demo-stack">
        <CatInput
          label="Input"
          hint="Type only 'a' characters to make it valid"
          value={text}
          required
          clearable
          errors={/^a+$/.test(text) ? false : { pattern: true }}
          onCatChange={e => setText(String(e.detail ?? ''))}
        />
        <CatInput
          label="Password"
          type="password"
          togglePassword
          value={password}
          onCatChange={e => setPassword(String(e.detail ?? ''))}
        />
        <CatInput label="With prefix and suffix" textPrefix="https://" textSuffix=".com" />
        <CatInput label="With icon" icon="search-outlined" placeholder="Search…" round />
        <CatInput label="Horizontal" horizontal hint="Label next to the field" />
        <CatInput label="Disabled" value="Cannot change this" disabled />
        <CatInput label="Optional" requiredMarker="optional" />
        <CatInput
          label="Upload file"
          type="file"
          multiple
          onCatChangeFiles={e => setFiles(Array.from(e.detail ?? []).map(file => file.name))}
        />
      </div>
      <Value value={{ text, password, files }} />
    </>
  );
}

export function TextareaDemo() {
  const [message, setMessage] = useState('');

  return (
    <>
      <CatTextarea
        label="Textarea"
        hint="Max. 200 characters"
        maxLength={200}
        rows={3}
        value={message}
        onCatChange={e => setMessage(String(e.detail ?? ''))}
      />
      <Value value={{ message }} />
    </>
  );
}

export function SelectDemo() {
  const [country, setCountry] = useState<unknown>(null);
  const [countries, setCountries] = useState<unknown>([]);
  const singleSelect = useRef<HTMLCatSelectElement>(null);
  const multipleSelect = useRef<HTMLCatSelectElement>(null);

  // A connector is passed via the select's connect() method, not as a prop.
  useEffect(() => {
    singleSelect.current?.connect(countryConnector);
    multipleSelect.current?.connect(countryConnector);
  }, []);

  return (
    <>
      <div className="demo-stack">
        <CatSelect
          ref={singleSelect}
          label="Country"
          placeholder="Select a country"
          clearable
          onCatChange={e => setCountry(e.detail)}
        />
        <CatSelect
          ref={multipleSelect}
          label="Countries"
          placeholder="Select countries"
          multiple
          clearable
          onCatChange={e => setCountries(e.detail)}
        />
      </div>
      <Value value={{ country, countries }} />
    </>
  );
}

export function TagDemo() {
  const [tags, setTags] = useState<string[]>(['tag1', 'tag2']);

  return (
    <>
      <CatTag
        label="Tags"
        hint="Press space or comma to create a tag"
        value={tags}
        tagCreationChars={[' ', ',']}
        clearable
        onCatChange={e => setTags(e.detail)}
      />
      <Value value={{ tags }} />
    </>
  );
}

export function CheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <div className="demo-stack">
        <CatCheckbox label="Controlled checkbox" checked={checked} onCatChange={() => setChecked(!checked)} />
        <CatCheckbox label="Indeterminate" indeterminate />
        <CatCheckbox label="Disabled" disabled />
        <CatCheckbox label="Required" required requiredMarker="required" />
        <CatCheckbox label="Label on the left" labelLeft />
        {alignments.map(alignment => (
          <CatCheckbox key={alignment} alignment={alignment}>
            <div slot="label">
              <div>Aligned {alignment}</div>
              <div>Subline</div>
            </div>
          </CatCheckbox>
        ))}
      </div>
      <Value value={{ checked }} />
    </>
  );
}

export function ToggleDemo() {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <div className="demo-stack">
        <CatToggle label="Controlled toggle" checked={toggled} onCatChange={() => setToggled(!toggled)} />
        <CatToggle label="Disabled" disabled />
        <CatToggle label="Label on the left" labelLeft />
        {alignments.map(alignment => (
          <CatToggle key={alignment} alignment={alignment}>
            <div slot="label">
              <div>Aligned {alignment}</div>
              <div>Subline</div>
            </div>
          </CatToggle>
        ))}
      </div>
      <Value value={{ toggled }} />
    </>
  );
}

export function RadioDemo() {
  const [radio, setRadio] = useState<unknown>('two');

  return (
    <>
      <div className="demo-stack">
        <CatRadio label="Standalone radio" />
        <CatRadio label="Disabled radio" disabled />
        {alignments.map(alignment => (
          <CatRadio key={alignment} alignment={alignment}>
            <div slot="label">
              <div>Aligned {alignment}</div>
              <div>Subline</div>
            </div>
          </CatRadio>
        ))}
        <CatRadioGroup a11yLabel="Options" value={radio} onCatChange={e => setRadio(e.detail)}>
          <CatRadio label="Option 1" value="one" />
          <CatRadio label="Option 2" value="two" />
          <CatRadio label="Option 3" value="three" />
        </CatRadioGroup>
      </div>
      <Value value={{ radio }} />
    </>
  );
}

export function FormGroupDemo() {
  return (
    <>
      <CatFormGroup>
        <CatInput label="First name" required />
        <CatInput label="Last name" required />
      </CatFormGroup>
      <h3>Horizontal</h3>
      <CatFormGroup horizontal labelSize="30%" requiredMarker="optional">
        <CatInput label="Email" type="email" required />
        <CatTextarea label="Bio" />
        <CatSelect label="Choose" />
      </CatFormGroup>
    </>
  );
}
