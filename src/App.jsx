import React, { useEffect, useState } from "react";
import "./App.css";
import TermsOfService from "./TermsOfService";
import DocumentCapture from "./DocumentCapture";

const CBP_SEAL_URL = "https://i94.cbp.dhs.gov/assets/images/svg/cbp-seal.svg";

const navItems = [
  "Home",
  "Apply for I-94",
  "Get Most Recent I-94/I-95",
  "View Travel History",
  "View Compliance",
  "Help",
];

function Seal({ className = "" }) {
  return <img className={`cbp-seal ${className}`} src={CBP_SEAL_URL} alt="U.S. Customs and Border Protection seal" />;
}

function HelpMark({ label }) {
  return (
    <button className="help-mark" type="button" aria-label={`Help for ${label}`} title={`Help for ${label}`}>
      ?
    </button>
  );
}



const COUNTRY_OPTIONS = [{"name":"Afghanistan","code":"AFG"},{"name":"Åland Islands","code":"ALA"},{"name":"Albania","code":"ALB"},{"name":"Algeria","code":"DZA"},{"name":"American Samoa","code":"ASM"},{"name":"Andorra","code":"AND"},{"name":"Angola","code":"AGO"},{"name":"Anguilla","code":"AIA"},{"name":"Antarctica","code":"ATA"},{"name":"Antigua and Barbuda","code":"ATG"},{"name":"Argentina","code":"ARG"},{"name":"Armenia","code":"ARM"},{"name":"Aruba","code":"ABW"},{"name":"Australia","code":"AUS"},{"name":"Austria","code":"AUT"},{"name":"Azerbaijan","code":"AZE"},{"name":"Bahamas","code":"BHS"},{"name":"Bahrain","code":"BHR"},{"name":"Bangladesh","code":"BGD"},{"name":"Barbados","code":"BRB"},{"name":"Belarus","code":"BLR"},{"name":"Belgium","code":"BEL"},{"name":"Belize","code":"BLZ"},{"name":"Benin","code":"BEN"},{"name":"Bermuda","code":"BMU"},{"name":"Bhutan","code":"BTN"},{"name":"Bolivia, Plurinational State of","code":"BOL"},{"name":"Bonaire, Sint Eustatius and Saba","code":"BES"},{"name":"Bosnia and Herzegovina","code":"BIH"},{"name":"Botswana","code":"BWA"},{"name":"Bouvet Island","code":"BVT"},{"name":"Brazil","code":"BRA"},{"name":"British Indian Ocean Territory","code":"IOT"},{"name":"Brunei Darussalam","code":"BRN"},{"name":"Bulgaria","code":"BGR"},{"name":"Burkina Faso","code":"BFA"},{"name":"Burma","code":"BUR"},{"name":"Burundi","code":"BDI"},{"name":"Cabo Verde","code":"CPV"},{"name":"Cambodia","code":"KHM"},{"name":"Cameroon","code":"CMR"},{"name":"Canada","code":"CAN"},{"name":"Cayman Islands","code":"CYM"},{"name":"Central African Republic","code":"CAF"},{"name":"Chad","code":"TCD"},{"name":"Chile","code":"CHL"},{"name":"China","code":"CHN"},{"name":"Christmas Island","code":"CXR"},{"name":"Cocos (Keeling) Islands","code":"CCK"},{"name":"Colombia","code":"COL"},{"name":"Comoros","code":"COM"},{"name":"Congo","code":"COG"},{"name":"Congo, The Democratic Republic of the","code":"COD"},{"name":"Cook Islands","code":"COK"},{"name":"Costa Rica","code":"CRI"},{"name":"Côte d'Ivoire","code":"CIV"},{"name":"Croatia","code":"HRV"},{"name":"Cuba","code":"CUB"},{"name":"Curaçao","code":"CUW"},{"name":"Cyprus","code":"CYP"},{"name":"Czechia","code":"CZE"},{"name":"Czechoslovakia","code":"CSK"},{"name":"Denmark","code":"DNK"},{"name":"Djibouti","code":"DJI"},{"name":"Dominica","code":"DMA"},{"name":"Dominican Republic","code":"DOM"},{"name":"East Timor","code":"TMP"},{"name":"Ecuador","code":"ECU"},{"name":"Egypt","code":"EGY"},{"name":"El Salvador","code":"SLV"},{"name":"Equatorial Guinea","code":"GNQ"},{"name":"Eritrea","code":"ERI"},{"name":"Estonia","code":"EST"},{"name":"Eswatini","code":"SWZ"},{"name":"Ethiopia","code":"ETH"},{"name":"Falkland Islands (Malvinas)","code":"FLK"},{"name":"Faroe Islands","code":"FRO"},{"name":"Fiji","code":"FJI"},{"name":"Finland","code":"FIN"},{"name":"France","code":"FRA"},{"name":"French Guiana","code":"GUF"},{"name":"French Polynesia","code":"PYF"},{"name":"French Southern Territories","code":"ATF"},{"name":"Gabon","code":"GAB"},{"name":"Gambia","code":"GMB"},{"name":"Georgia","code":"GEO"},{"name":"Germany","code":"DEU"},{"name":"Ghana","code":"GHA"},{"name":"Gibraltar","code":"GIB"},{"name":"Greece","code":"GRC"},{"name":"Greenland","code":"GRL"},{"name":"Grenada","code":"GRD"},{"name":"Guadeloupe","code":"GLP"},{"name":"Guam","code":"GUM"},{"name":"Guatemala","code":"GTM"},{"name":"Guernsey","code":"GGY"},{"name":"Guinea","code":"GIN"},{"name":"Guinea-Bissau","code":"GNB"},{"name":"Guyana","code":"GUY"},{"name":"Haiti","code":"HTI"},{"name":"Heard Island and McDonald Islands","code":"HMD"},{"name":"Holy See (Vatican City State)","code":"VAT"},{"name":"Honduras","code":"HND"},{"name":"Hong Kong","code":"HKG"},{"name":"Hungary","code":"HUN"},{"name":"Iceland","code":"ISL"},{"name":"India","code":"IND"},{"name":"Indonesia","code":"IDN"},{"name":"Iran, Islamic Republic of","code":"IRN"},{"name":"Iraq","code":"IRQ"},{"name":"Ireland","code":"IRL"},{"name":"Isle of Man","code":"IMN"},{"name":"Israel","code":"ISR"},{"name":"Italy","code":"ITA"},{"name":"Jamaica","code":"JAM"},{"name":"Japan","code":"JPN"},{"name":"Jersey","code":"JEY"},{"name":"Jordan","code":"JOR"},{"name":"Kazakhstan","code":"KAZ"},{"name":"Kenya","code":"KEN"},{"name":"Kiribati","code":"KIR"},{"name":"Korea, Democratic People's Republic of","code":"PRK"},{"name":"Korea, Republic of","code":"KOR"},{"name":"Kuwait","code":"KWT"},{"name":"Kyrgyzstan","code":"KGZ"},{"name":"Lao People's Democratic Republic","code":"LAO"},{"name":"Latvia","code":"LVA"},{"name":"Lebanon","code":"LBN"},{"name":"Lesotho","code":"LSO"},{"name":"Liberia","code":"LBR"},{"name":"Libya","code":"LBY"},{"name":"Liechtenstein","code":"LIE"},{"name":"Lithuania","code":"LTU"},{"name":"Luxembourg","code":"LUX"},{"name":"Macao","code":"MAC"},{"name":"Madagascar","code":"MDG"},{"name":"Malawi","code":"MWI"},{"name":"Malaysia","code":"MYS"},{"name":"Maldives","code":"MDV"},{"name":"Mali","code":"MLI"},{"name":"Malta","code":"MLT"},{"name":"Marshall Islands","code":"MHL"},{"name":"Martinique","code":"MTQ"},{"name":"Mauritania","code":"MRT"},{"name":"Mauritius","code":"MUS"},{"name":"Mayotte","code":"MYT"},{"name":"Mexico","code":"MEX"},{"name":"Micronesia, Federated States of","code":"FSM"},{"name":"Moldova, Republic of","code":"MDA"},{"name":"Monaco","code":"MCO"},{"name":"Mongolia","code":"MNG"},{"name":"Montenegro","code":"MNE"},{"name":"Montserrat","code":"MSR"},{"name":"Morocco","code":"MAR"},{"name":"Mozambique","code":"MOZ"},{"name":"Myanmar","code":"MMR"},{"name":"Namibia","code":"NAM"},{"name":"Nauru","code":"NRU"},{"name":"Nepal","code":"NPL"},{"name":"Netherlands","code":"NLD"},{"name":"Netherlands Antilles","code":"ANT"},{"name":"New Caledonia","code":"NCL"},{"name":"New Zealand","code":"NZL"},{"name":"Nicaragua","code":"NIC"},{"name":"Niger","code":"NER"},{"name":"Nigeria","code":"NGA"},{"name":"Niue","code":"NIU"},{"name":"Norfolk Island","code":"NFK"},{"name":"North Macedonia","code":"MKD"},{"name":"Northern Mariana Islands","code":"MNP"},{"name":"Norway","code":"NOR"},{"name":"Oman","code":"OMN"},{"name":"Pakistan","code":"PAK"},{"name":"Palau","code":"PLW"},{"name":"Palestine, State of","code":"PSE"},{"name":"Panama","code":"PAN"},{"name":"Papua New Guinea","code":"PNG"},{"name":"Paraguay","code":"PRY"},{"name":"Peru","code":"PER"},{"name":"Philippines","code":"PHL"},{"name":"Pitcairn","code":"PCN"},{"name":"Poland","code":"POL"},{"name":"Portugal","code":"PRT"},{"name":"Puerto Rico","code":"PRI"},{"name":"Qatar","code":"QAT"},{"name":"Réunion","code":"REU"},{"name":"Romania","code":"ROU"},{"name":"Russian Federation","code":"RUS"},{"name":"Rwanda","code":"RWA"},{"name":"Saint Barthélemy","code":"BLM"},{"name":"Saint Helena, Ascension and Tristan da Cunha","code":"SHN"},{"name":"Saint Kitts and Nevis","code":"KNA"},{"name":"Saint Lucia","code":"LCA"},{"name":"Saint Martin (French part)","code":"MAF"},{"name":"Saint Pierre and Miquelon","code":"SPM"},{"name":"Saint Vincent and the Grenadines","code":"VCT"},{"name":"Samoa","code":"WSM"},{"name":"San Marino","code":"SMR"},{"name":"Sao Tome and Principe","code":"STP"},{"name":"Saudi Arabia","code":"SAU"},{"name":"Senegal","code":"SEN"},{"name":"Serbia","code":"SRB"},{"name":"Serbia and Montenegro","code":"SCG"},{"name":"Seychelles","code":"SYC"},{"name":"Sierra Leone","code":"SLE"},{"name":"Singapore","code":"SGP"},{"name":"Sint Maarten (Dutch part)","code":"SXM"},{"name":"Slovakia","code":"SVK"},{"name":"Slovenia","code":"SVN"},{"name":"Solomon Islands","code":"SLB"},{"name":"Somalia","code":"SOM"},{"name":"South Africa","code":"ZAF"},{"name":"South Georgia and the South Sandwich Islands","code":"SGS"},{"name":"South Sudan","code":"SSD"},{"name":"South Yemen","code":"YMD"},{"name":"Soviet Union","code":"SUN"},{"name":"Spain","code":"ESP"},{"name":"Sri Lanka","code":"LKA"},{"name":"Sudan","code":"SDN"},{"name":"Suriname","code":"SUR"},{"name":"Svalbard and Jan Mayen","code":"SJM"},{"name":"Sweden","code":"SWE"},{"name":"Switzerland","code":"CHE"},{"name":"Syrian Arab Republic","code":"SYR"},{"name":"Taiwan, Province of China","code":"TWN"},{"name":"Tajikistan","code":"TJK"},{"name":"Tanzania, United Republic of","code":"TZA"},{"name":"Thailand","code":"THA"},{"name":"Timor-Leste","code":"TLS"},{"name":"Togo","code":"TGO"},{"name":"Tokelau","code":"TKL"},{"name":"Tonga","code":"TON"},{"name":"Trinidad and Tobago","code":"TTO"},{"name":"Tunisia","code":"TUN"},{"name":"Türkiye","code":"TUR"},{"name":"Turkmenistan","code":"TKM"},{"name":"Turks and Caicos Islands","code":"TCA"},{"name":"Tuvalu","code":"TUV"},{"name":"Uganda","code":"UGA"},{"name":"Ukraine","code":"UKR"},{"name":"United Arab Emirates","code":"ARE"},{"name":"United Kingdom","code":"GBR"},{"name":"United States","code":"USA"},{"name":"United States Minor Outlying Islands","code":"UMI"},{"name":"Upper Volta","code":"HVO"},{"name":"Uruguay","code":"URY"},{"name":"Uzbekistan","code":"UZB"},{"name":"Vanuatu","code":"VUT"},{"name":"Venezuela, Bolivarian Republic of","code":"VEN"},{"name":"Viet Nam","code":"VNM"},{"name":"Virgin Islands, British","code":"VGB"},{"name":"Virgin Islands, U.S.","code":"VIR"},{"name":"Wallis and Futuna","code":"WLF"},{"name":"Western Sahara","code":"ESH"},{"name":"Yemen","code":"YEM"},{"name":"Yugoslavia","code":"YUG"},{"name":"Zaire","code":"ZAR"},{"name":"Zambia","code":"ZMB"},{"name":"Zimbabwe","code":"ZWE"}];

function CountrySelect({ value, onChange, label, invalid }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = COUNTRY_OPTIONS.filter((country) => {
    const searchText = `${country.name} ${country.code}`.toLowerCase();
    return searchText.includes(query.trim().toLowerCase());
  });

  const closeMenu = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <div className={`field country-select ${open ? "country-open" : ""} ${invalid ? "invalid" : ""}`}>
      <label className={`country-label ${value ? "has-value" : ""}`}>{label}<span className="asterisk">*</span></label>
      <input
        type="text"
        name="countrySearch"
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder="Pick one"
        value={open ? query : value}
        onFocus={() => { setQuery(""); setOpen(true); }}
        onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
      />
      <HelpMark label={label} />
      {open && (
        <>
          <button className="country-dismiss" type="button" aria-label="Close country list" onClick={closeMenu} />
          <div className="country-menu" role="listbox" aria-label={`${label} options`}>
            <div className="country-options">
              {filtered.map((country) => {
                const option = `${country.name} (${country.code})`;
                return (
                  <button
                    type="button"
                    role="option"
                    aria-selected={value === option}
                    key={country.code}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => { onChange(option); closeMenu(); }}
                  >
                    {option}
                  </button>
                );
              })}
              {filtered.length === 0 && <div className="country-no-results">No countries found</div>}
            </div>
            <div className="country-count">{filtered.length === COUNTRY_OPTIONS.length ? "259 total options" : `${filtered.length} matching options`}</div>
          </div>
        </>
      )}
      {invalid && <small className="field-error">Please select a country.</small>}
    </div>
  );
}


const MONTH_NAMES = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function DateOfBirthField({ value, onChange, invalid = false, label = "Date of Birth" }) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("days");
  const [visibleMonth, setVisibleMonth] = useState(today.getMonth());
  const [visibleYear, setVisibleYear] = useState(today.getFullYear());
  const [draftDate, setDraftDate] = useState(value ? new Date(`${value}T12:00:00`) : null);

  const selected = value ? new Date(`${value}T12:00:00`) : null;
  const firstDay = new Date(visibleYear, visibleMonth, 1).getDay();
  const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate();
  const calendarCells = Array.from({ length: firstDay }, () => null)
    .concat(Array.from({ length: daysInMonth }, (_, index) => index + 1));
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  const toISO = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const isFuture = (year, month, day) => {
    const candidate = new Date(year, month, day);
    return candidate > new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const openPicker = () => {
    setVisibleMonth(selected ? selected.getMonth() : today.getMonth());
    setVisibleYear(selected ? selected.getFullYear() : today.getFullYear());
    setDraftDate(selected);
    setView("days");
    setOpen(true);
  };

  const moveMonth = (amount) => {
    const next = new Date(visibleYear, visibleMonth + amount, 1);
    if (next > new Date(today.getFullYear(), today.getMonth(), 1)) return;
    setVisibleMonth(next.getMonth());
    setVisibleYear(next.getFullYear());
  };

  const chooseDay = (day) => {
    if (!day || isFuture(visibleYear, visibleMonth, day)) return;
    setDraftDate(new Date(visibleYear, visibleMonth, day, 12));
  };

  const applyDate = () => {
    if (draftDate) onChange(toISO(draftDate));
    setOpen(false);
  };

  const displayValue = selected
    ? `${selected.getMonth() + 1}/${selected.getDate()}/${selected.getFullYear()}`
    : "";

  const yearStart = Math.max(1900, visibleYear - 23);
  const years = Array.from({ length: 24 }, (_, index) => yearStart + index);

  return (
    <div className={`dob-control ${open ? "picker-open" : ""} ${invalid ? "invalid" : ""}`}>
      <div className="dob-input-shell">
        <label className={`dob-label ${value ? "has-value" : ""}`}>{label}<span className="asterisk">*</span></label>
        <div className="dob-value">{displayValue}</div>
        <button className="dob-calendar-trigger" type="button" aria-label={`Choose ${label.toLowerCase()}`} onClick={openPicker}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 2v3M17 2v3M4 8h16M5 4h14a1 1 0 0 1 1 1v15H4V5a1 1 0 0 1 1-1Z" />
            <path d="M8 11h3v3H8z" />
          </svg>
        </button>
        <HelpMark label="Date of Birth" />
      </div>
      <div className="dob-format">MM/DD/YYYY</div>
      {invalid && <small className="field-error dob-error">Select or enter a valid date less than or equal to today in format MM/DD/YYYY.</small>}

      {open && (
        <>
          <button className="calendar-dismiss" type="button" aria-label="Close calendar" onClick={() => setOpen(false)} />
          <div className="dob-calendar" role="dialog" aria-label={`Choose ${label.toLowerCase()}`}>
            <div className="calendar-header">
              {view === "days" && (
                <button className="calendar-title" type="button" onClick={() => setView("years")}>
                  {MONTH_NAMES[visibleMonth]} {visibleYear}<span className="calendar-caret" />
                </button>
              )}
              {view === "years" && (
                <button className="calendar-title year-range-title" type="button" onClick={() => setView("years")}>
                  {yearStart} – {yearStart + 23}<span className="calendar-caret up" />
                </button>
              )}
              {view === "months" && (
                <button className="calendar-title" type="button" onClick={() => setView("years")}>
                  {visibleYear}<span className="calendar-caret up" />
                </button>
              )}
              <div className="calendar-arrows">
                <button type="button" aria-label="Previous" onClick={() => {
                  if (view === "days") moveMonth(-1);
                  else if (view === "months") setVisibleYear((year) => Math.max(1900, year - 1));
                  else setVisibleYear((year) => Math.max(1900, year - 24));
                }}>‹</button>
                <button type="button" aria-label="Next" onClick={() => {
                  if (view === "days") moveMonth(1);
                  else if (view === "months") setVisibleYear((year) => Math.min(today.getFullYear(), year + 1));
                  else setVisibleYear((year) => Math.min(today.getFullYear() - 23, year + 24));
                }}>›</button>
              </div>
            </div>

            {view === "days" && (
              <div className="calendar-days-view">
                <div className="calendar-weekdays">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
                </div>
                <div className="calendar-month-label">{MONTH_NAMES[visibleMonth]}</div>
                <div className="calendar-day-grid">
                  {calendarCells.map((day, index) => {
                    const chosen = day && draftDate &&
                      draftDate.getFullYear() === visibleYear &&
                      draftDate.getMonth() === visibleMonth &&
                      draftDate.getDate() === day;
                    const disabled = !day || isFuture(visibleYear, visibleMonth, day);
                    return (
                      <button
                        key={`${visibleYear}-${visibleMonth}-${index}`}
                        type="button"
                        className={`${chosen ? "selected" : ""} ${disabled ? "disabled" : ""}`}
                        disabled={disabled}
                        onClick={() => chooseDay(day)}
                      >
                        {day || ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {view === "years" && (
              <div className="calendar-year-grid">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    className={year === visibleYear ? "selected" : ""}
                    disabled={year > today.getFullYear()}
                    onClick={() => { setVisibleYear(year); setView("months"); }}
                  >{year}</button>
                ))}
              </div>
            )}

            {view === "months" && (
              <div className="calendar-month-grid">
                {MONTH_NAMES.map((month, index) => (
                  <button
                    key={month}
                    type="button"
                    className={index === visibleMonth ? "selected" : ""}
                    disabled={visibleYear === today.getFullYear() && index > today.getMonth()}
                    onClick={() => { setVisibleMonth(index); setView("days"); }}
                  >{month}</button>
                ))}
              </div>
            )}

            <div className="calendar-actions">
              <button type="button" className="calendar-cancel" onClick={() => setOpen(false)}>Cancel</button>
              <button type="button" className="calendar-apply" onClick={applyDate} disabled={!draftDate}>Apply</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function I94Page({ page, onNavigate, onOpenSideHelp, onOpenAdmin, onContinueSearch, onOpenDocumentCapture, noRecord = false, initialSearch = null }) {
  const isTravelHistory = page === "history";
  const [form, setForm] = useState(() => ({
    firstName: initialSearch?.firstName || "",
    lastName: initialSearch?.lastName || "",
    dob: initialSearch?.dob || "",
    country: initialSearch?.country || "",
    documentNumber: initialSearch?.documentNumber || "",
  }));

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const validDob = (() => {
    if (!form.dob) return false;
    const parsed = new Date(`${form.dob}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return parsed <= today && parsed.toISOString().slice(0, 10) === form.dob;
  })();

  const complete = Boolean(
    form.firstName.trim() &&
    form.lastName.trim() &&
    validDob &&
    form.country.trim() &&
    form.documentNumber.trim()
  );
  const errors = {
    firstName: attemptedSubmit && !form.firstName.trim(),
    lastName: attemptedSubmit && !form.lastName.trim(),
    dob: attemptedSubmit && !validDob,
    country: attemptedSubmit && !form.country.trim(),
    documentNumber: attemptedSubmit && !form.documentNumber.trim(),
  };

  return (
    <div className="site-shell">
      <div className="government-strip">
        <img
          className="us-flag-image"
          src="https://i94.cbp.dhs.gov/assets/images/jpg/flag.jpg"
          alt="United States flag"
        />
        <span>Official Website of the Department of Homeland Security</span>
      </div>

      <header className="brand-header">
        <div className="brand-left">
          <Seal className="header-seal" />
          <div className="agency-name">U.S. Customs and<br />Border Protection</div>
        </div>
        <div className="brand-title">
          <strong>I-94/I-95 Website</strong>
          <span>Travel Record for U.S. Visitors</span>
        </div>
      </header>

      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const isHistoryTab = item === "View Travel History";
          const isRecentTab = item === "Get Most Recent I-94/I-95";
          return (
            <button
              key={item}
              className={(isTravelHistory ? isHistoryTab : isRecentTab) ? "active" : ""}
              type="button"
              onClick={() => {
                if (isHistoryTab) onNavigate("history");
                if (isRecentTab) onNavigate("recent");
              }}
            >
              {item}
            </button>
          );
        })}
      </nav>

      <main className={`main-content ${isTravelHistory ? "history-content" : ""}`}>
        <h1>{isTravelHistory ? "View Travel History" : "Get Most Recent I-94/I-95"}</h1>
        <div className="thin-rule" />
        <p className="intro">
          {isTravelHistory
            ? "View your United States arrival and departure history"
            : "Get your most recent I-94/I-95 form to prove your legal visitor status in the United States (I-94 available going back to 1983 for most classes of admission, (or parole), and indefinitely for certain classes, such as diplomats and those admitted under the Compacts of Free Association. I-95 response is restricted to only return an I-95 that is not expired."}
        </p>
        {noRecord && !isTravelHistory && (
          <div className="no-record-alert" role="alert">
            <span className="no-record-icon">!</span>
            No Record Found for Traveler
          </div>
        )}

        <section className={`traveler-section ${isTravelHistory ? "history-traveler-section" : ""}`}>
          <div className="section-heading">
            <h2>{isTravelHistory ? "Enter Traveler Information" : "Enter Your Traveler Info"}</h2>
            {!isTravelHistory && <button type="button" className="capture-button" onClick={onOpenDocumentCapture}>CAPTURE DOCUMENT</button>}
          </div>
          <div className="thin-rule" />

          {!isTravelHistory && (
            <p className="note">
              <strong>Note:</strong> The info returned may not reflect applications submitted to or benefits received by U.S. Citizenship and Immigration Services or Immigration and Customs Enforcement.
            </p>
          )}
          <p className="required-note">Required fields are indicated by an asterisk *</p>

          <form className="traveler-form" noValidate onSubmit={(event) => { event.preventDefault(); setAttemptedSubmit(true); }}>
            <label className={`field ${errors.firstName ? "invalid" : ""}`}>
              <span>First (Given) Name<span className="asterisk">*</span></span>
              <input name="firstName" placeholder=" " value={form.firstName} onChange={update} autoComplete="given-name" />
              <HelpMark label="First Name" />
              {errors.firstName && <small className="field-error">First Name is required.</small>}
            </label>

            <label className={`field ${errors.lastName ? "invalid" : ""}`}>
              <span>Last (Family) Name/Surname<span className="asterisk">*</span></span>
              <input name="lastName" placeholder=" " value={form.lastName} onChange={update} autoComplete="family-name" />
              <HelpMark label="Last Name" />
              {errors.lastName && <small className="field-error">Last Name is required.</small>}
            </label>

            <DateOfBirthField
              value={form.dob}
              onChange={(dob) => setForm((current) => ({ ...current, dob }))}
              invalid={errors.dob}
            />

            <CountrySelect
              label={isTravelHistory ? "Document Country of Issuance" : "Country of Citizenship"}
              value={form.country}
              onChange={(country) => setForm((current) => ({ ...current, country }))}
              invalid={errors.country}
            />

            <label className={`field ${errors.documentNumber ? "invalid" : ""}`}>
              <span>Document Number<span className="asterisk">*</span></span>
              <input name="documentNumber" placeholder=" " value={form.documentNumber} onChange={update} />
              <HelpMark label="Document Number" />
              {errors.documentNumber && <small className="field-error">Document number is required.</small>}
            </label>
          </form>

          <div className="continue-row">
            <button
              type="button"
              className="continue-button"
              aria-disabled={!complete}
              onClick={() => {
                setAttemptedSubmit(true);
                if (complete && onContinueSearch) onContinueSearch(form);
              }}
            >Continue</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-seal"><Seal className="footer-seal-image" /></div>

          <div className="footer-column">
            <h3>HELPFUL SITES:</h3>
            <a href="#faq">CBP Info Center's FAQ about I-94/I-95</a>
            <a href="#about">About CBP</a>
            <a href="#vulnerability">Vulnerability Disclosure</a>
            <a href="#guam">Guam-CNMI Travel Info</a>
          </div>

          <div className="footer-column">
            <h3>SITE POLICIES:</h3>
            <a href="#accessibility">Accessibility</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#contact">Contact CBP</a>
          </div>

          <div className="footer-column paperwork">
            <h3>PAPERWORK REDUCTION ACT:</h3>
            <p>
              An agency may not conduct or sponsor an information collection and a person is not
              required to respond to this information unless it displays a current valid OMB control
              number. The control number for this collection is 1651-0111. The estimated average time
              to complete this application is 4 minutes. If you have any comments regarding the burden
              estimate you can write to U.S. Customs and Border Protection, Office of Regulations and
              Rulings, 90 K Street, NE, Washington DC 20229.
            </p>
          </div>
        </div>
        <div className="footer-bottom">OMB No. 1651-0111&nbsp;&nbsp; Expiration Date: 11/30/2026</div>
      </footer>

      <button className="need-help" type="button" aria-label="Do you need help?" onClick={onOpenAdmin}>
        <svg className="chat-icon" viewBox="0 0 28 28" aria-hidden="true">
          <path d="M3.5 4.5h20v14h-12l-7 5v-19Z" />
          <path d="M8 9h11M8 13h8" />
        </svg>
        <span>Do you need help?</span>
      </button>
      <button className="side-help" type="button" onClick={onOpenSideHelp}>Need Help?</button>
    </div>
  );
}


const EMPTY_I94_RECORD = {
  admissionNumber: "",
  arrivalDate: "",
  classOfAdmission: "",
  admitUntilDate: "",
  lastName: "",
  firstName: "",
  dob: "",
  documentNumber: "",
  country: "",
};

function EditI94Form({ initialData, onSave, onBack }) {
  const [values, setValues] = useState({ ...EMPTY_I94_RECORD, ...initialData });
  const [validationMessage, setValidationMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setValidationMessage("");
  };
  const update = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setValidationMessage("");
  };

  const save = () => {
    const required = Object.keys(EMPTY_I94_RECORD);
    const missing = required.filter((key) => !String(values[key] || "").trim());
    if (missing.length) {
      setValidationMessage("Please complete all required I-94 fields before saving.");
      return;
    }
    onSave(values);
  };

  return (
    <div className="edit-i94-page">
      <div className="edit-i94-topbar">
        <button type="button" onClick={onBack}>← Back</button>
        <div>
          <h1>Edit I-94/I-95</h1>
          <p>Enter the admission and traveler information for the I-94 record.</p>
        </div>
      </div>
      <main className="edit-i94-panel">
        <div className="edit-i94-title-row">
          <div>
            <h2>Admission Information</h2>
            <p className="edit-i94-required">Required fields are indicated by an asterisk *</p>
          </div>
        </div>
        <div className="edit-i94-grid">
          <label className="edit-i94-field">
            <span>Admission I-94 Record Number<span>*</span></span>
            <input name="admissionNumber" value={values.admissionNumber} onChange={updateField} placeholder="Enter admission I-94 record number" />
          </label>
          <div className="edit-i94-field edit-i94-dob">
            <DateOfBirthField
              value={values.arrivalDate}
              onChange={(value) => update("arrivalDate", value)}
              label="Arrival/Issued Date"
            />
          </div>
          <label className="edit-i94-field">
            <span>Class of Admission<span>*</span></span>
            <input name="classOfAdmission" value={values.classOfAdmission} onChange={updateField} placeholder="e.g. F1" />
          </label>
          <label className="edit-i94-field">
            <span>Admit Until Date<span>*</span></span>
            <input name="admitUntilDate" value={values.admitUntilDate} onChange={updateField} placeholder="MM/DD/YYYY or D/S" />
          </label>
          <label className="edit-i94-field">
            <span>Last/Surname<span>*</span></span>
            <input name="lastName" value={values.lastName} onChange={updateField} placeholder="Enter last name" />
          </label>
          <label className="edit-i94-field">
            <span>First (Given) Name<span>*</span></span>
            <input name="firstName" value={values.firstName} onChange={updateField} placeholder="Enter first name" />
          </label>
          <div className="edit-i94-field edit-i94-dob">
            <DateOfBirthField value={values.dob} onChange={(value) => update("dob", value)} />
          </div>
          <label className="edit-i94-field">
            <span>Document (Passport) Number<span>*</span></span>
            <input name="documentNumber" value={values.documentNumber} onChange={updateField} placeholder="Enter passport number" />
          </label>
          <div className="edit-i94-country">
            <CountrySelect label="Country of Citizenship" value={values.country} onChange={(value) => update("country", value)} />
          </div>
        </div>
        {validationMessage && <p className="edit-i94-validation" role="alert">{validationMessage}</p>}
        <div className="edit-i94-actions">
          <button type="button" className="edit-secondary-button" onClick={save}>Save</button>
        </div>
      </main>
    </div>
  );
}


const EMPTY_TRAVEL_HISTORY = {
  documentNumber: "",
  country: "",
  rows: [{ id: 1, date: "", type: "", location: "" }],
};

function EditTravelHistoryForm({ initialData, onSave, onBack }) {
  const [values, setValues] = useState(() => ({
    ...EMPTY_TRAVEL_HISTORY,
    ...(initialData || {}),
    rows: initialData?.rows?.length
      ? initialData.rows.map((row, index) => ({ ...row, id: row.id || index + 1 }))
      : [{ id: 1, date: "", type: "", location: "" }],
  }));
  const [message, setMessage] = useState("");

  const updateTop = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setMessage("");
  };

  const updateRow = (id, field, value) => {
    setValues((current) => ({
      ...current,
      rows: current.rows.map((row) => row.id === id ? { ...row, [field]: value } : row),
    }));
    setMessage("");
  };

  const addRow = () => {
    if (values.rows.length >= 5) return;
    const nextId = Math.max(0, ...values.rows.map((row) => Number(row.id) || 0)) + 1;
    setValues((current) => ({
      ...current,
      rows: [...current.rows, { id: nextId, date: "", type: "", location: "" }],
    }));
    setMessage("");
  };

  const removeRow = (id) => {
    setValues((current) => ({ ...current, rows: current.rows.filter((row) => row.id !== id) }));
    setMessage("");
  };

  const save = () => {
    const hasValidRow = values.rows.length > 0 &&
      values.rows.every((row) => row.date.trim() && row.type.trim() && row.location.trim());
    if (!values.documentNumber.trim() || !values.country.trim() || !hasValidRow) {
      setMessage("Enter the document number, country of issuance, and complete each travel-history row before saving.");
      return;
    }
    onSave({ ...values, rows: values.rows.map(({ id, ...row }) => row) });
  };

  return (
    <div className="edit-i94-page edit-history-page">
      <div className="edit-i94-topbar">
        <button type="button" onClick={onBack}>← Back</button>
        <div>
          <h1>Edit Travel History</h1>
          <p>Enter the document information and up to five travel-history entries.</p>
        </div>
      </div>
      <main className="edit-i94-panel">
        <div className="edit-i94-title-row">
          <div>
            <h2>Travel History Information</h2>
            <p className="edit-i94-required">Enter the document details and at least one complete row.</p>
          </div>
        </div>

        <div className="edit-i94-grid history-document-grid">
          <label className="edit-i94-field">
            <span>Document Number<span>*</span></span>
            <input name="documentNumber" value={values.documentNumber} onChange={updateTop} placeholder="Enter document number" />
          </label>
          <div className="edit-i94-country">
            <CountrySelect
              label="Document Country of Issuance"
              value={values.country}
              onChange={(country) => { setValues((current) => ({ ...current, country })); setMessage(""); }}
            />
          </div>
        </div>

        <div className="history-rows-heading">
          <div>
            <h2>Travel History Entries</h2>
            <p className="edit-i94-required">You can add, edit, or remove rows. Maximum 5 rows.</p>
          </div>
          <button type="button" className="edit-secondary-button" onClick={addRow} disabled={values.rows.length >= 5}>
            + Add Row
          </button>
        </div>

        <div className="history-edit-rows">
          {values.rows.map((row, index) => (
            <div className="history-edit-row" key={row.id}>
              <div className="history-row-label">Row {index + 1}</div>
              <div className="edit-i94-field edit-i94-dob history-date-field">
                <DateOfBirthField
                  value={row.date}
                  onChange={(value) => updateRow(row.id, "date", value)}
                  label="DATE"
                />
              </div>
              <label className="edit-i94-field">
                <span>TYPE<span>*</span></span>
                <select value={row.type} onChange={(event) => updateRow(row.id, "type", event.target.value)}>
                  <option value="">Select type</option>
                  <option value="Arrival">Arrival</option>
                  <option value="Departure">Departure</option>
                </select>
              </label>
              <label className="edit-i94-field">
                <span>LOCATION<span>*</span></span>
                <input value={row.location} onChange={(event) => updateRow(row.id, "location", event.target.value)} placeholder="Enter location (e.g. NYC)" />
              </label>
              <button
                type="button"
                className="history-remove-row"
                onClick={() => removeRow(row.id)}
                aria-label={`Remove row ${index + 1}`}
              >Remove</button>
            </div>
          ))}
          {values.rows.length === 0 && <p className="history-empty-rows">No rows added. Select “Add Row” to enter a travel-history record.</p>}
        </div>

        {message && <p className="edit-i94-validation" role="alert">{message}</p>}
        <div className="edit-i94-actions">
          <button type="button" className="edit-secondary-button" onClick={onBack}>Cancel</button>
          <button type="button" className="edit-primary-button" onClick={save}>Save</button>
        </div>
      </main>
    </div>
  );
}

function TravelHistoryResultPage({ record, onEditSearch, onGetI94, onOpenSideHelp, onOpenAdmin, onNavigate }) {
  const rows = record?.rows || [];
  return (
    <div className="site-shell history-result-shell">
      <div className="government-strip">
        <img className="us-flag-image" src="https://i94.cbp.dhs.gov/assets/images/jpg/flag.jpg" alt="United States flag" />
        <span>Official Website of the Department of Homeland Security</span>
      </div>
      <header className="brand-header">
        <div className="brand-left"><Seal className="header-seal" /><div className="agency-name">U.S. Customs and<br />Border Protection</div></div>
        <div className="brand-title"><strong>I-94/I-95 Website</strong><span>Travel Record for U.S. Visitors</span></div>
      </header>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const isHistoryTab = item === "View Travel History";
          const isRecentTab = item === "Get Most Recent I-94/I-95";
          return <button key={item} className={isHistoryTab ? "active" : ""} type="button" onClick={() => {
            if (isRecentTab) onNavigate("recent");
            if (isHistoryTab) onNavigate("history");
          }}>{item}</button>;
        })}
      </nav>
      <main className="history-result-content">
        <h1>View Travel History</h1>
        <div className="thin-rule" />
        <p className="intro">Travel history includes up to 100 arrivals and departures spanning the last ten years</p>
        <h2 className="history-result-title">Travel History Results</h2>
        <div className="thin-rule" />
        <div className="history-result-document">
          <p>Document Number: <strong>{record.documentNumber}</strong></p>
          <p>Document Country of Issuance: <strong>{String(record.country || "").replace(/\s*\([A-Z]{3}\)$/, "")}</strong></p>
        </div>
        <table className="history-result-table">
          <thead><tr><th>Row</th><th>DATE</th><th>TYPE</th><th>LOCATION</th></tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.date}-${index}`}>
                <td>{index + 1}</td>
                <td>{row.date}</td>
                <td>{row.type}</td>
                <td>{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="history-result-actions">
          <button type="button" className="edit-primary-button" onClick={onEditSearch}>Edit Search</button>
          <button type="button" className="edit-primary-button" onClick={onGetI94}>Get Most Recent I-94/I-95</button>
        </div>
        <div className="history-print-row">
          <button type="button" className="edit-primary-button" onClick={() => window.print()}>Print</button>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-seal"><Seal className="footer-seal-image" /></div>
          <div className="footer-column"><h3>HELPFUL SITES:</h3><a href="#faq">CBP Info Center's FAQ about I-94/I-95</a><a href="#about">About CBP</a><a href="#vulnerability">Vulnerability Disclosure</a><a href="#guam">Guam-CNMI Travel Info</a></div>
          <div className="footer-column"><h3>SITE POLICIES:</h3><a href="#accessibility">Accessibility</a><a href="#privacy">Privacy Policy</a><a href="#contact">Contact CBP</a></div>
          <div className="footer-column paperwork"><h3>PAPERWORK REDUCTION ACT:</h3><p>An agency may not conduct or sponsor an information collection and a person is not required to respond to this information unless it displays a current valid OMB control number. The control number for this collection is 1651-0111. The estimated average time to complete this application is 4 minutes.</p></div>
        </div>
        <div className="footer-bottom">OMB No. 1651-0111&nbsp;&nbsp; Expiration Date: 11/30/2026</div>
      </footer>
      <button className="need-help" type="button" onClick={onOpenAdmin}><svg className="chat-icon" viewBox="0 0 28 28" aria-hidden="true"><path d="M3.5 4.5h20v14h-12l-7 5v-19Z" /><path d="M8 9h11M8 13h8" /></svg><span>Do you need help?</span></button>
      <button className="side-help" type="button" onClick={onOpenSideHelp}>Need Help?</button>
    </div>
  );
}

function I94ResultPage({ record, onEdit, onBackToSearch, onGetHistory, onOpenSideHelp, onOpenAdmin, onNavigate }) {
  const prettyDate = (value) => {
    if (!value) return "";
    const date = new Date(`${value}T12:00:00`);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };
  return (
    <div className="site-shell i94-result-shell">
      <div className="government-strip">
        <img className="us-flag-image" src="https://i94.cbp.dhs.gov/assets/images/jpg/flag.jpg" alt="United States flag" />
        <span>Official Website of the Department of Homeland Security</span>
      </div>
      <header className="brand-header">
        <div className="brand-left"><Seal className="header-seal" /><div className="agency-name">U.S. Customs and<br />Border Protection</div></div>
        <div className="brand-title"><strong>I-94/I-95 Website</strong><span>Travel Record for U.S. Visitors</span></div>
      </header>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const isHistoryTab = item === "View Travel History";
          const isRecentTab = item === "Get Most Recent I-94/I-95";
          return <button key={item} className={isRecentTab ? "active" : ""} type="button" onClick={() => {
            if (isHistoryTab) onNavigate("history");
            if (isRecentTab) onNavigate("recent");
          }}>{item}</button>;
        })}
      </nav>
      <main className="i94-result-content">
        <h1>Get Most Recent I-94</h1>
        <div className="thin-rule" />
        <p className="intro">Get your most recent I-94 form to prove your legal visitor status in the United States</p>
        <h2 className="result-section-title">Most Recent I-94</h2>
        <div className="thin-rule" />
        <p className="employer-note"><strong>Note to employers, local, state or federal agency granting benefits:</strong><br />
          Please visit the CBP I-94/I-95 Website and click on the tab for “Get Most Recent I-94/I-95” to perform a search for the applicant to confirm that the biographic and travel information displayed on this I-94 printout matches the “Get Most Recent I-94/I-95” returned results for this applicant. Reference the <a href="#faq">CBP I-94/I-95 Website FAQs.</a>
        </p>
        <div className="admission-summary">
          <div><strong>Admission I-94 Record Number:</strong>&nbsp; {record.admissionNumber}</div>
          <div><strong>Arrival/Issued Date:</strong>&nbsp; {prettyDate(record.arrivalDate)}</div>
          <div><strong>Class of Admission:</strong>&nbsp; {record.classOfAdmission}</div>
          <div><strong>Admit Until Date:</strong>&nbsp; {record.admitUntilDate}</div>
        </div>
        <p className="details-caption">Details provided on the I-94 Information form:</p>
        <div className="traveler-record-details">
          <div><strong>Last/Surname:</strong>{record.lastName}</div>
          <div><strong>First (Given) Name:</strong>{record.firstName}</div>
          <div><strong>Birth Date:</strong>{prettyDate(record.dob)}</div>
          <div><strong>Document Number:</strong>{record.documentNumber}</div>
          <div><strong>Country of Citizenship:</strong>{record.country.replace(/\s*\([A-Z]{3}\)$/, "")}</div>
        </div>
        <div className="result-actions">
          <button type="button" className="edit-primary-button" onClick={onEdit}>Edit Search</button>
          <button type="button" className="edit-primary-button" onClick={onGetHistory}>Get Traveler History</button>
        </div>
        <div className="result-departure-note">
          Note to Nonimmigrant travelers: Nonimmigrant travelers departing the United States by land or private vessel can now use the <a href="#mobile">CBP Link Mobile Application</a> by selecting "Departing Traveler" then "Verify My Exit" to report their departure. Please note that departure should only be reported after you have physically left the United States. If you departed by air or sea, your departure was likely recorded automatically.
          <button type="button" className="edit-primary-button" onClick={() => window.print()}>Print</button>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-seal"><Seal className="footer-seal-image" /></div>
          <div className="footer-column"><h3>HELPFUL SITES:</h3><a href="#faq">CBP Info Center's FAQ about I-94/I-95</a><a href="#about">About CBP</a><a href="#vulnerability">Vulnerability Disclosure</a><a href="#guam">Guam-CNMI Travel Info</a></div>
          <div className="footer-column"><h3>SITE POLICIES:</h3><a href="#accessibility">Accessibility</a><a href="#privacy">Privacy Policy</a><a href="#contact">Contact CBP</a></div>
          <div className="footer-column paperwork"><h3>PAPERWORK REDUCTION ACT:</h3><p>An agency may not conduct or sponsor an information collection and a person is not required to respond to this information unless it displays a current valid OMB control number. The control number for this collection is 1651-0111. The estimated average time to complete this application is 4 minutes. If you have any comments regarding the burden estimate you can write to U.S. Customs and Border Protection, Office of Regulations and Rulings, 90 K Street, NE, Washington DC 20229.</p></div>
        </div>
        <div className="footer-bottom">OMB No. 1651-0111&nbsp;&nbsp; Expiration Date: 11/30/2026</div>
      </footer>
      <button className="need-help" type="button" onClick={onOpenAdmin}><svg className="chat-icon" viewBox="0 0 28 28" aria-hidden="true"><path d="M3.5 4.5h20v14h-12l-7 5v-19Z" /><path d="M8 9h11M8 13h8" /></svg><span>Do you need help?</span></button>
      <button className="side-help" type="button" onClick={onOpenSideHelp}>Need Help?</button>
    </div>
  );
}


export default function App() {
  const [activePage, setActivePage] = useState("recent");
  const [termsVisible, setTermsVisible] = useState(false);
  // While the terms dialog is open, keep the page behind it stationary.
  // The terms text itself remains scrollable inside TermsOfService.
  useEffect(() => {
    if (!termsVisible) return undefined;

    // Always show the same top-of-page header/navigation behind the terms
    // dialog on both the I-94 and Travel History flows.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [termsVisible]);

  const [termsTarget, setTermsTarget] = useState("history");
  const [showDocumentCapture, setShowDocumentCapture] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [editPage, setEditPage] = useState("");
  const [i94Record, setI94Record] = useState(() => {
    try {
      const stored = window.localStorage.getItem("cbp-user-i94-record-v2");
      return stored ? { ...EMPTY_I94_RECORD, ...JSON.parse(stored) } : { ...EMPTY_I94_RECORD };
    } catch {
      return { ...EMPTY_I94_RECORD };
    }
  });
  const [travelHistoryRecord, setTravelHistoryRecord] = useState(() => {
    try {
      const stored = window.localStorage.getItem("cbp-user-travel-history-v1");
      return stored ? JSON.parse(stored) : { ...EMPTY_TRAVEL_HISTORY };
    } catch {
      return { ...EMPTY_TRAVEL_HISTORY };
    }
  });
  const [showI94Result, setShowI94Result] = useState(false);
  const [showHistoryResult, setShowHistoryResult] = useState(false);
  const [noRecordFound, setNoRecordFound] = useState(false);

  // Access control state. Existing page layout and edit forms remain unchanged.
  const [accessMode, setAccessMode] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [accessLoading, setAccessLoading] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [adminCodes, setAdminCodes] = useState([]);
  const [newCustomerCode, setNewCustomerCode] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminBusy, setAdminBusy] = useState(false);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const callEdgeFunction = async (functionName, body) => {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase configuration is missing. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your project .env file.");
    }
   const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/functions/v1/${functionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || `Request failed (${response.status}).`);
    return result;
  };

  const openCustomerAccess = () => {
    setAccessMode("customer");
    setAccessCode("");
    setAccessError("");
    setAccessLoading(false);
  };

  const openAdminAccess = () => {
    setAccessMode("admin");
    setAccessCode("");
    setAccessError("");
    setAccessLoading(false);
    setAdminError("");
  };

  const submitAccessCode = async (event) => {
    event.preventDefault();
    if (!accessCode.trim()) {
      setAccessError("Please enter your access code.");
      return;
    }
    setAccessLoading(true);
    setAccessError("");
    try {
      if (accessMode === "customer") {
        const result = await callEdgeFunction("validate-code", { code: accessCode.trim() });
        if (!result.valid) {
          setAccessError(result.message || "Invalid access code.");
          return;
        }
        setAccessMode("");
        setAccessCode("");
        setShowHelpMenu(true);
      } else {
        const result = await callEdgeFunction("manage-codes", { passcode: accessCode, action: "list" });
        setAdminPasscode(accessCode);
        setAdminCodes(result.codes || []);
        setAccessMode("");
        setAccessCode("");
        setAdminError("");
      }
    } catch (error) {
      setAccessError(error.message || "Unable to verify access. Please try again.");
    } finally {
      setAccessLoading(false);
    }
  };

  const runAdminAction = async (action, extra = {}) => {
    setAdminBusy(true);
    setAdminError("");
    try {
      const result = await callEdgeFunction("manage-codes", {
        passcode: adminPasscode,
        action,
        ...extra,
      });
      if (action === "list") setAdminCodes(result.codes || []);
      if (action === "add" || action === "delete") {
        const refreshed = await callEdgeFunction("manage-codes", {
          passcode: adminPasscode,
          action: "list",
        });
        setAdminCodes(refreshed.codes || []);
      }
      return result;
    } catch (error) {
      setAdminError(error.message || "Unable to complete the admin action.");
      return null;
    } finally {
      setAdminBusy(false);
    }
  };

  const addCustomerCode = async (event) => {
    event.preventDefault();
    const code = newCustomerCode.trim();
    if (!code) {
      setAdminError("Enter a customer code first.");
      return;
    }
    const result = await runAdminAction("add", { code });
    if (result?.success) setNewCustomerCode("");
  };

  const openTerms = (destination) => {
    setTermsTarget(destination);
    setTermsVisible(true);
    setShowHelpMenu(false);
    setShowI94Result(false);
    setShowHistoryResult(false);
    setNoRecordFound(false);
    setShowDocumentCapture(false);
    setEditPage("");
  };

  const acceptTerms = () => {
    const destination = termsTarget === "history" ? "history" : "recent";
    setTermsVisible(false);
    setShowI94Result(false);
    setShowHistoryResult(false);
    setNoRecordFound(false);
    setActivePage(destination);
    // The I-94 flow displays the Document Capture information popup
    // immediately after Terms of Service is accepted. Travel History
    // proceeds directly to its own page without this popup.
    setShowDocumentCapture(destination === "recent");
  };

  const saveI94Record = (record) => {
    const normalized = { ...EMPTY_I94_RECORD, ...record };
    setI94Record(normalized);
    try {
      window.localStorage.setItem("cbp-user-i94-record-v2", JSON.stringify(normalized));
    } catch (error) {
      console.warn("Could not save the I-94 demo details in this browser.", error);
    }
    setEditPage("history");
    setShowI94Result(false);
    setShowHistoryResult(false);
    setNoRecordFound(false);
    setShowHelpMenu(false);
  };

  const saveTravelHistory = (record) => {
    const normalized = { ...record, rows: record.rows || [] };
    setTravelHistoryRecord(normalized);
    try {
      window.localStorage.setItem("cbp-user-travel-history-v1", JSON.stringify(normalized));
    } catch (error) {
      console.warn("Could not save the travel-history demo details in this browser.", error);
    }
    setEditPage("");
    setTermsTarget("history");
    setTermsVisible(true);
    setShowHelpMenu(false);
    setShowHistoryResult(false);
    setShowI94Result(false);
  };

  const handleMainSearchContinue = () => {
    if (activePage === "history") {
      const completeHistory = Boolean(
        travelHistoryRecord.documentNumber &&
        travelHistoryRecord.country &&
        travelHistoryRecord.rows?.length
      );
      setShowHistoryResult(completeHistory);
      setShowI94Result(false);
      setNoRecordFound(!completeHistory);
      return;
    }
    const requiredFields = ["admissionNumber", "arrivalDate", "classOfAdmission", "admitUntilDate", "lastName", "firstName", "dob", "documentNumber", "country"];
    const hasCompleteSavedRecord = requiredFields.every((key) => String(i94Record[key] || "").trim());
    setShowI94Result(hasCompleteSavedRecord);
    setShowHistoryResult(false);
    setNoRecordFound(!hasCompleteSavedRecord);
  };

  const openSearchPage = (destination) => {
    setActivePage(destination);
    setShowI94Result(false);
    setShowHistoryResult(false);
    setNoRecordFound(false);
    setShowDocumentCapture(false);
    setShowHelpMenu(false);
    setTermsVisible(false);
  };

  if (declined) {
    return (
      <div className="terms-exit-screen">
        <div className="terms-exit-card">
          <Seal className="terms-exit-seal" />
          <h1>Terms of Service Not Accepted</h1>
          <p>You chose not to acknowledge the terms. Refresh this demo page to review them again.</p>
          <button onClick={() => window.location.reload()}>Review Terms Again</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {editPage === "recent" ? (
        <EditI94Form
          initialData={i94Record}
          onSave={saveI94Record}
          onBack={() => { setEditPage(""); setShowHelpMenu(true); }}
        />
      ) : editPage === "history" ? (
        <EditTravelHistoryForm
          initialData={travelHistoryRecord}
          onSave={saveTravelHistory}
          onBack={() => { setEditPage("recent"); }}
        />
      ) : showI94Result ? (
        <I94ResultPage
          record={i94Record}
          onEdit={() => openSearchPage("recent")}
          onBackToSearch={() => openSearchPage("recent")}
          onGetHistory={() => openTerms("history")}
          onNavigate={openTerms}
          onOpenSideHelp={openCustomerAccess}
          onOpenAdmin={openAdminAccess}
        />
      ) : showHistoryResult ? (
        <TravelHistoryResultPage
          record={travelHistoryRecord}
          onEditSearch={() => openSearchPage("history")}
          onGetI94={() => openTerms("recent")}
          onNavigate={openTerms}
          onOpenSideHelp={openCustomerAccess}
          onOpenAdmin={openAdminAccess}
        />
      ) : (
        <I94Page
          page={activePage}
          noRecord={noRecordFound}
          onContinueSearch={handleMainSearchContinue}
          onOpenSideHelp={openCustomerAccess}
          onOpenAdmin={openAdminAccess}
          onOpenDocumentCapture={() => setShowDocumentCapture(true)}
          onNavigate={openTerms}
        />
      )}

      {accessMode && (
        <div className="access-dialog-overlay" role="presentation">
          <section className="access-dialog-card" role="dialog" aria-modal="true" aria-labelledby="access-dialog-title">
            <button type="button" className="access-dialog-close" aria-label="Close" onClick={() => { setAccessMode(""); setAccessError(""); }}>×</button>
            <h2 id="access-dialog-title">{accessMode === "customer" ? "Customer access" : "Admin access"}</h2>
            <p>{accessMode === "customer" ? "Enter your access code to continue." : "Enter the admin passcode to manage customer codes."}</p>
            <form onSubmit={submitAccessCode}>
              <input
                type="password"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                placeholder={accessMode === "customer" ? "Customer access code" : "Admin passcode"}
                autoComplete="off"
                autoFocus
              />
              <button type="submit" disabled={accessLoading}>{accessLoading ? "Checking..." : "Continue"}</button>
            </form>
            {accessError && <p className="access-dialog-error" role="alert">{accessError}</p>}
          </section>
        </div>
      )}

      {adminPasscode && (
        <div className="access-dialog-overlay admin-dashboard-overlay" role="presentation">
          <section className="admin-dashboard-card" role="dialog" aria-modal="true" aria-labelledby="admin-dashboard-title">
            <button type="button" className="access-dialog-close" aria-label="Close admin dashboard" onClick={() => { setAdminPasscode(""); setAdminCodes([]); setAdminError(""); }}>×</button>
            <h2 id="admin-dashboard-title">Admin dashboard</h2>
            <p>Manage customer access codes.</p>
            <form className="admin-add-code-form" onSubmit={addCustomerCode}>
              <input
                type="text"
                value={newCustomerCode}
                onChange={(event) => setNewCustomerCode(event.target.value)}
                placeholder="Enter a new customer code"
                autoComplete="off"
              />
              <button type="submit" disabled={adminBusy}>Add code</button>
            </form>
            {adminError && <p className="access-dialog-error" role="alert">{adminError}</p>}
            <div className="admin-code-list-heading">
              <strong>Customer codes ({adminCodes.length})</strong>
              <button type="button" onClick={() => runAdminAction("list")} disabled={adminBusy}>Refresh</button>
            </div>
            <div className="admin-code-list">
              {adminCodes.length === 0 ? (
                <p>No customer codes have been added yet.</p>
              ) : adminCodes.map((item) => (
                <div className="admin-code-row" key={item.id}>
                  <span>{item.customer_label || "Customer"}{item.is_disabled ? " (Disabled)" : ""}</span>
                  <button type="button" onClick={() => runAdminAction("delete", { id: item.id })} disabled={adminBusy}>Delete</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {showHelpMenu && !editPage && (
        <div className="help-menu-overlay" role="presentation">
          <section className="help-menu-card" role="dialog" aria-modal="true" aria-labelledby="help-menu-title">
            <button type="button" className="help-menu-close" aria-label="Close help options" onClick={() => setShowHelpMenu(false)}>×</button>
            <h2 id="help-menu-title">Need Help?</h2>
            <button type="button" className="help-menu-option" onClick={() => { setEditPage("recent"); setShowI94Result(false); setShowHistoryResult(false); setNoRecordFound(false); setShowDocumentCapture(false); setTermsVisible(false); setShowHelpMenu(false); }}>Edit I-94/I-95</button>
            <button type="button" className="help-menu-option" onClick={() => { setEditPage("history"); setTermsVisible(false); setShowHelpMenu(false); }}>Edit Travel History</button>
          </section>
        </div>
      )}

      {termsVisible && !showHelpMenu && !editPage && (
        <TermsOfService onAgree={acceptTerms} onDecline={() => setDeclined(true)} />
      )}

      {showDocumentCapture && activePage === "recent" && (
        <DocumentCapture onClose={() => setShowDocumentCapture(false)} />
      )}
    </>
  );
}
