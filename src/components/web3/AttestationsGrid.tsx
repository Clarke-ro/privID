import { AttestationCard } from './AttestationCard';
import { ReputationCard } from './ReputationCard';
import { toast } from 'sonner';

interface Attestation {
  id: string;
  title: string;
  status: 'linked' | 'not-linked' | 'pending';
}

const attestations: Attestation[] = [
  { id: 'national-id', title: 'Link your National ID', status: 'not-linked' },
  { id: 'passport', title: 'Link your Passport', status: 'not-linked' },
  { id: 'drivers-license', title: 'Link your Driver\'s License', status: 'not-linked' },
  { id: 'voter-card', title: 'Link your Voter Card', status: 'not-linked' },
  { id: 'binance', title: 'Connect Binance', status: 'not-linked' },
  { id: 'coinbase', title: 'Connect Coinbase', status: 'not-linked' },
  { id: 'proof-humanity', title: 'Verify Proof of Humanity', status: 'not-linked' },
  { id: 'ens', title: 'Verify ENS', status: 'not-linked' },
  { id: 'gitcoin', title: 'Link your Gitcoin Passport', status: 'not-linked' },
  { id: 'linkedin', title: 'Link your LinkedIn', status: 'not-linked' },
  { id: 'twitter', title: 'Link your Twitter', status: 'not-linked' },
  { id: 'github', title: 'Link your GitHub', status: 'not-linked' },
  { id: 'proof-address', title: 'Verify Proof of Address', status: 'not-linked' },
  { id: 'phone', title: 'Link your Phone Number', status: 'not-linked' },
];

export const AttestationsGrid = () => {
  const handleLinkAttestation = (attestationId: string, title: string) => {
    toast.info(`Linking ${title}...`, {
      description: 'Smart contract integration coming soon'
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative">
        {/* Top row attestations */}
        {attestations.slice(0, 4).map((attestation, index) => (
          <AttestationCard
            key={attestation.id}
            title={attestation.title}
            status={attestation.status}
            onLink={() => handleLinkAttestation(attestation.id, attestation.title)}
            className={index === 3 ? 'md:col-start-4 lg:col-start-4 xl:col-start-5' : ''}
          />
        ))}

        {/* Second row - left attestations */}
        {attestations.slice(4, 6).map((attestation) => (
          <AttestationCard
            key={attestation.id}
            title={attestation.title}
            status={attestation.status}
            onLink={() => handleLinkAttestation(attestation.id, attestation.title)}
          />
        ))}

        {/* Central Reputation Card - spans 3 columns in the middle */}
        <div className="md:col-span-1 lg:col-span-1 xl:col-span-1 flex justify-center">
          <div className="w-full max-w-sm">
            <ReputationCard />
          </div>
        </div>

        {/* Second row - right attestations */}
        {attestations.slice(6, 8).map((attestation, index) => (
          <AttestationCard
            key={attestation.id}
            title={attestation.title}
            status={attestation.status}
            onLink={() => handleLinkAttestation(attestation.id, attestation.title)}
            className={index === 1 ? 'md:col-start-4 lg:col-start-4 xl:col-start-5' : ''}
          />
        ))}

        {/* Bottom row attestations */}
        {attestations.slice(8, 12).map((attestation, index) => (
          <AttestationCard
            key={attestation.id}
            title={attestation.title}
            status={attestation.status}
            onLink={() => handleLinkAttestation(attestation.id, attestation.title)}
            className={index === 3 ? 'md:col-start-4 lg:col-start-4 xl:col-start-5' : ''}
          />
        ))}

        {/* Last row attestations */}
        {attestations.slice(12).map((attestation, index) => (
          <AttestationCard
            key={attestation.id}
            title={attestation.title}
            status={attestation.status}
            onLink={() => handleLinkAttestation(attestation.id, attestation.title)}
            className={index === 1 ? 'md:col-start-4 lg:col-start-4 xl:col-start-5' : 'md:col-start-2 lg:col-start-2 xl:col-start-2'}
          />
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Attestations are stored as Merkle tree proofs on-chain</p>
        <p className="mt-1">QR code serves as the main verification point across dApps</p>
      </div>
    </div>
  );
};