import { CatDate, CatDateInline, CatDatepicker, CatDatepickerInline, CatTime } from '@haiilo/catalyst-react';
import React, { useState } from 'react';
import { Value } from '../Section';

export function DateTimeDemo() {
  const [date, setDate] = useState<unknown>('2024-06-21');
  const [time, setTime] = useState<unknown>('12:00');

  return (
    <>
      <div className="demo-stack">
        <CatDate label="Date" value={date as string} clearable onCatChange={e => setDate(e.detail)} />
        <CatTime label="Time" value={time as string} clearable onCatChange={e => setTime(e.detail)} />
        <CatDate label="Disabled date" disabled />
      </div>
      <Value value={{ date, time }} />
    </>
  );
}

export function DatepickerDemo() {
  const [picked, setPicked] = useState<unknown>(null);
  const [range, setRange] = useState<unknown>(null);

  return (
    <>
      <div className="demo-stack">
        <CatDatepicker label="Date" mode="date" clearable onCatChange={e => setPicked(e.detail)} />
        <CatDatepicker label="Date and time" mode="datetime" clearable />
        <CatDatepicker label="Time" mode="time" />
        <CatDatepicker label="Week" mode="week" />
        <CatDatepicker label="Date range" mode="daterange" onCatChange={e => setRange(e.detail)} />
      </div>
      <Value value={{ picked, range }} />
    </>
  );
}

export function DateInlineDemo() {
  const [inlineDate, setInlineDate] = useState<unknown>('2024-06-21');

  return (
    <>
      <CatDateInline label="Pick a date" value={inlineDate as string} onCatChange={e => setInlineDate(e.detail)} />
      <Value value={{ inlineDate }} />
    </>
  );
}

export function DatepickerInlineDemo() {
  const [inlineDatetime, setInlineDatetime] = useState<unknown>('2024-06-21T10:00:00.000Z');

  return (
    <>
      <CatDatepickerInline
        mode="datetime"
        value={inlineDatetime as string}
        onCatChange={e => setInlineDatetime(e.detail)}
      />
      <Value value={{ inlineDatetime }} />
    </>
  );
}
