import { AttestationCard } from './AttestationCard';
import { IDCard } from './IDCard';
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
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-4 gap-4">
        {/* First row - 4 cards */}
        {attestations.slice(0, 4).map((attestation) => (
          <AttestationCard
            key={attestation.id}
            title={attestation.title}
            status={attestation.status}
            onLink={() => handleLinkAttestation(attestation.id, attestation.title)}
          />
        ))}

        {/* Second row - 2 cards with central ID card */}
        <AttestationCard
          title={attestations[4].title}
          status={attestations[4].status}
          onLink={() => handleLinkAttestation(attestations[4].id, attestations[4].title)}
        />
        
        {/* Central IDCard spanning 2 columns */}
        <div className="col-span-2">
          <IDCard />
        </div>
        
        <AttestationCard
          title={attestations[5].title}
          status={attestations[5].status}
          onLink={() => handleLinkAttestation(attestations[5].id, attestations[5].title)}
        />

        {/* Third row - 4 cards */}
        {attestations.slice(6, 10).map((attestation) => (
          <AttestationCard
            key={attestation.id}
            title={attestation.title}
            status={attestation.status}
            onLink={() => handleLinkAttestation(attestation.id, attestation.title)}
          />
        ))}

        {/* Fourth row - 4 cards */}
        {attestations.slice(10, 14).map((attestation) => (
          <AttestationCard
            key={attestation.id}
            title={attestation.title}
            status={attestation.status}
            onLink={() => handleLinkAttestation(attestation.id, attestation.title)}
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