import React, { useRef, useState } from "react";
import "./TermsOfService.css";

const CBP_SEAL_URL = "https://i94.cbp.dhs.gov/assets/images/svg/cbp-seal.svg";

export default function TermsOfService({ onAgree, onDecline }) {
  const scrollRef = useRef(null);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const checkScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 12;
    if (atBottom) setHasReachedEnd(true);
  };

  return (
    <div className="terms-overlay" role="dialog" aria-modal="true" aria-labelledby="terms-title">
      <section className="terms-modal">
        <button className="terms-close" type="button" onClick={onDecline} aria-label="Close terms and exit">×</button>

        <header className="terms-header">
          <h1 id="terms-title">Terms of Service</h1>
          <img src={CBP_SEAL_URL} alt="U.S. Customs and Border Protection seal" />
        </header>

        <div className="terms-scroll" ref={scrollRef} onScroll={checkScroll}>
          <p>
            <strong>
              This is a Department of Homeland Security website. This website including all data accessed
              is the property of the U.S. Government and is provided for official U.S. Government purposes
              and use only.
            </strong>{" "}
            You are authorized to use this Site only for personal, non-commercial purposes. You may
            download or copy the content displayed on the Site for your personal use only. No right,
            title, or interest in any downloaded material or software is transferred to you as a result
            of any such downloading or copying.
          </p>

          <p>
            <strong>
              If you are a Federal, State, local, tribal, or foreign law enforcement officer or government
              official in need of information about an individual for official purposes, please contact
              CBP through your established channels.
            </strong>
          </p>

          <p>
            The access and use of this website are subject to monitoring by DHS for administrative, law
            enforcement and criminal investigative purposes, inquiries into alleged wrongdoing or misuse,
            and to ensure proper performance of applicable security features and procedures. DHS may
            monitor the access and use of this website without further notice.
          </p>

          <p>
            By accessing this website, you understand and acknowledge that when using this Site, you are
            strictly prohibited from:
          </p>

          <ul>
            <li>Changing, deleting, adding, or otherwise modifying any content contained in the system or on any printout from the system.</li>
            <li>Engaging in unauthorized spidering, scraping, or data mining of content through software, devices, scripts, bots, automated processes, browser plug-ins, add-ons, or manual work.</li>
            <li>Taking any action that imposes an unreasonable or disproportionately large load on the network or infrastructure.</li>
            <li>Bypassing or circumventing access controls or service-use limits.</li>
            <li>Using any device, software, or routine to interfere or attempt to interfere with the proper working of the Site or activity conducted on the Site.</li>
            <li>Probing, scanning, testing the vulnerability of, or breaching the security of any system or network.</li>
            <li>Attempting to decipher, decompile, disassemble, or reverse-engineer software comprising or used by the Site.</li>
            <li>Processing classified national security information on this website.</li>
            <li>Engaging in conduct that restricts or inhibits any person from using or enjoying this Site.</li>
          </ul>

          <hr />

          <p>
            Any violation of these Terms of Use, or unauthorized access, use, or modification of this
            system or data contained herein, or in transit to or from this system, may constitute a
            violation of applicable law and may result in civil and/or criminal liability and permanent
            denial of access to the Site. CBP reserves the right to take such action as it deems
            appropriate to enforce its rights under these Terms of Use.
          </p>

          <p>
            By selecting “I Acknowledge and Agree,” you confirm that you have read and understand the
            terms displayed in this demonstration. This locally recreated page is not the official CBP
            website and does not submit an acknowledgement to CBP.
          </p>
        </div>

        <footer className="terms-actions">
          <button className="terms-decline" type="button" onClick={onDecline}>DECLINE &amp; EXIT</button>
          <button
            className="terms-agree"
            type="button"
            disabled={!hasReachedEnd}
            onClick={onAgree}
          >
            I ACKNOWLEDGE AND AGREE
          </button>
        </footer>
      </section>
    </div>
  );
}
