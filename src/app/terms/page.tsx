import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service — RepoGuard" };

export default function TermsPage() {
  return (
    <>
      <Nav />
      <div className="legal">
        <h1>Terms of Service</h1>
        <p className="legal__date">Last updated: July 1, 2026</p>

        <h2>Overview</h2>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of
          RepoGuard-IfeCodes (&ldquo;RepoGuard&rdquo;, &ldquo;the
          Service&rdquo;). By installing or using RepoGuard, you agree to these
          Terms.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By installing RepoGuard on your GitHub account or organisation, you
          confirm that you are at least 13 years of age, have the authority to
          install software on the account or organisation, and agree to be bound
          by these Terms and our Privacy Policy.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          RepoGuard provides automated security scanning for GitHub
          repositories, including:
        </p>
        <ul>
          <li>Detection of malicious code patterns on push events</li>
          <li>Full repository scans on installation</li>
          <li>Pull request scanning with inline review comments</li>
          <li>Automated fix pull requests for detected issues</li>
          <li>
            Check run integration to block merges when security issues are found
          </li>
          <li>Slack and webhook notifications for security alerts</li>
        </ul>

        <h2>3. Acceptable Use</h2>
        <p>
          You agree to use RepoGuard only for lawful purposes and only on
          repositories you own or have permission to scan. You must not attempt
          to reverse engineer, tamper with, or disrupt the Service, circumvent
          rate limits or access controls, or use the Service in a way that
          places unreasonable load on our infrastructure.
        </p>

        <h2>4. GitHub App Permissions</h2>
        <p>RepoGuard requires the following GitHub permissions to operate:</p>
        <table>
          <thead>
            <tr>
              <th>Permission</th>
              <th>Level</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Contents</td>
              <td>Read</td>
              <td>Read repository files to perform security scans</td>
            </tr>
            <tr>
              <td>Checks</td>
              <td>Read & Write</td>
              <td>Create check runs to report scan results</td>
            </tr>
            <tr>
              <td>Issues</td>
              <td>Read & Write</td>
              <td>Open all-clear issues and security reports</td>
            </tr>
            <tr>
              <td>Pull Requests</td>
              <td>Read & Write</td>
              <td>Open fix PRs and post review comments</td>
            </tr>
            <tr>
              <td>Metadata</td>
              <td>Read</td>
              <td>Access repository metadata</td>
            </tr>
            <tr>
              <td>Actions</td>
              <td>Read</td>
              <td>Scan workflow files for misconfigurations</td>
            </tr>
            <tr>
              <td>Members</td>
              <td>Read</td>
              <td>Verify organisation membership on branch events</td>
            </tr>
          </tbody>
        </table>

        <h2>5. Free Plan</h2>
        <p>
          RepoGuard is currently offered free of charge. We reserve the right to
          introduce paid plans in the future with reasonable advance notice.
          Existing users will not be automatically upgraded to a paid plan.
        </p>

        <h2>6. Disclaimer of Warranties</h2>
        <p>
          THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
          AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND. We do not warrant that
          the Service will detect all malicious code, be error-free or
          uninterrupted, or that scan results will be accurate or complete.
        </p>
        <p>
          <strong>
            RepoGuard is a security tool, not a security guarantee.
          </strong>{" "}
          It is designed to assist in identifying potential threats but should
          not be your sole security measure. You remain responsible for the
          security of your repositories and code.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, REPOGUARD AND ITS
          DEVELOPER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          OR CONSEQUENTIAL DAMAGES, LOSS OF DATA OR BUSINESS, OR DAMAGES ARISING
          FROM RELIANCE ON SCAN RESULTS. Our total liability for any claim shall
          not exceed the amount you paid us in the 12 months preceding the
          claim.
        </p>

        <h2>8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless RepoGuard and its developer
          from any claims, damages, or expenses arising from your use of the
          Service, your violation of these Terms, or any code or content in your
          repositories.
        </p>

        <h2>9. Modifications</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service at
          any time. We may update these Terms from time to time and will update
          the date above. Continued use of the Service after changes are posted
          constitutes acceptance of the revised Terms.
        </p>

        <h2>10. Termination</h2>
        <p>
          You may stop using the Service at any time by uninstalling RepoGuard.
          We may terminate or suspend your access at any time, with or without
          cause or notice.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the Federal Republic of
          Nigeria. Any disputes shall be subject to the exclusive jurisdiction
          of the courts of Nigeria.
        </p>

        <h2>12. Contact</h2>
        <p>
          <strong>Fortune Ife Aladetan (IfeCodes)</strong>
          <br />
          GitHub:{" "}
          <a
            href="https://github.com/ALADETAN-IFE"
            style={{ color: "var(--blue)" }}
          >
            github.com/ALADETAN-IFE
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
}
