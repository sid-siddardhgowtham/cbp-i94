import React from "react";
import "./DocumentCapture.css";

const CBP_SEAL_URL = "https://i94.cbp.dhs.gov/assets/images/svg/cbp-seal.svg";

export default function DocumentCapture({ onClose }) {
  return (
    <div className="capture-overlay" role="dialog" aria-modal="true" aria-labelledby="capture-title">
      <section className="capture-modal">
        <button
          className="capture-close"
          type="button"
          onClick={onClose}
          aria-label="Close document capture"
          title="Close"
        >
          ×
        </button>

        <h1 id="capture-title">Document Capture</h1>

        <div className="capture-language-row">
          <span>CHOOSE LANGUAGE</span>
          <div className="capture-language-static" aria-label="Selected language: English">
            <img
              src="https://i94.cbp.dhs.gov/assets/images/jpg/flag.jpg"
              alt=""
            />
            <span>ENGLISH</span>
            <span className="capture-caret">▾</span>
          </div>
        </div>

        <div className="capture-description">
          <p>
            Selection of the "CAPTURE DOCUMENT" button will allow you to populate applicant data
            with a capture of the applicant's document either by use of the device camera or by
            accessing a file with an image of the document's biographic page.
          </p>

          <p>
            The data from the scanned document MUST match the identity of the traveler. Following
            capture, you will have an opportunity to review and edit the captured information to
            ensure the application is correctly populated.
          </p>

          <p>
            If you choose the 'Camera' option, you will be able to use the device camera to read
            the document's biographic page. For accurate results, make sure the document's entire
            biographic page is captured, the MRZ is contained within the full width of the photograph
            and the photograph is not blurry. After successful completion of the photograph, your
            document's biographic information will be populated in the corresponding fields of the
            application.
          </p>
        </div>

        <div className="capture-footer">
          <button className="capture-action-inert" type="button" aria-disabled="true" tabIndex={-1}>
            CAPTURE DOCUMENT
          </button>
        </div>
      </section>
    </div>
  );
}
