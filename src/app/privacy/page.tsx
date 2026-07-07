import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — RepoGuard" };

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <div className="legal">
        <h1>Privacy Policy</h1>
        <p className="legal__date">Last updated: July 1, 2026</p>

        <h2>Overview</h2>
        <p>RepoGuard-IfeCodes (&ldquo;RepoGuard&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a GitHub App that scans your repositories for malicious code, security vulnerabilities, and suspicious patterns. This Privacy Policy explains what data we collect, how we use it, and your rights.</p>

        <h2>1. What Data We Collect</h2>
        <h3>1.1 GitHub Installation Data</h3>
        <p>When you install RepoGuard, we collect and store:</p>
        <ul>
          <li>Your GitHub account or organisation login name</li>
          <li>Your GitHub installation ID (assigned by GitHub)</li>
          <li>The names of repositories you grant RepoGuard access to</li>
          <li>Installation date and status</li>
        </ul>

        <h3>1.2 Scan Results</h3>
        <p>When RepoGuard scans your repositories, we store the names of files that triggered a finding, the rule matched, the severity level, and the scan timestamp. <strong>We do not store the contents of your files.</strong> File contents are read temporarily in memory and immediately discarded. Only findings are persisted.</p>

        <h3>1.3 Marketplace and Billing Data</h3>
        <p>If you install through the GitHub Marketplace, we collect your plan name, billing cycle, free trial status, and dates of plan changes or cancellations. We do not process or store payment information — all billing is handled by GitHub.</p>

        <h3>1.4 Usage Data</h3>
        <p>We collect basic operational logs including webhook event types, error messages for debugging, and scan completion status per repository.</p>

        <h2>2. How We Use Your Data</h2>
        <p>We use collected data solely to perform security scans, track scan progress, send security alerts (if you configure them), display scan history via the API, and maintain your installation and plan status. We do not use your data for advertising, profiling, or any purpose unrelated to the RepoGuard service.</p>

        <h2>3. Data Sharing</h2>
        <p>We do not sell, rent, or share your data with third parties except:</p>
        <ul>
          <li><strong>GitHub</strong> — to read repository contents and post check runs, issues, and pull requests on your behalf</li>
          <li><strong>MongoDB Atlas</strong> — where scan results and installation data are stored</li>
          <li><strong>Railway</strong> — where RepoGuard&apos;s server infrastructure is hosted</li>
          <li><strong>Slack</strong> — if you configure notifications, finding summaries (no file contents) are sent to your channel</li>
          <li><strong>Legal requirements</strong> — if required by law</li>
        </ul>

        <h2>4. Data Retention</h2>
        <ul>
          <li><strong>Installation data</strong> — retained while active; deleted 90 days after uninstallation</li>
          <li><strong>Scan results and findings</strong> — retained for 12 months, then permanently deleted</li>
          <li><strong>Logs</strong> — retained for 30 days</li>
        </ul>
        <p>You may request deletion of your data at any time by contacting us.</p>

        <h2>5. Security</h2>
        <p>We protect your data using TLS encryption in transit, HMAC-SHA256 webhook signature verification, API key authentication on all endpoints, and private key storage as environment variables — never on disk or in version control.</p>

        <h2>6. Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. Contact us to exercise these rights. We will respond within 30 days.</p>

        <h2>7. Contact</h2>
        <p>
          <strong>Fortune Ife Aladetan (IfeCodes)</strong><br />
          GitHub: <a href="https://github.com/ALADETAN-IFE" style={{color:"var(--blue)"}}>github.com/ALADETAN-IFE</a>
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this policy from time to time. We will notify users of significant changes by updating the date above. Continued use of RepoGuard after changes are posted constitutes acceptance of the revised policy.</p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>RepoGuard is not directed at children under the age of 13. We do not knowingly collect personal data from children under 13. If you believe we have inadvertently collected such data, please contact us immediately.</p>
      </div>
      <Footer />
    </>
  );
}
