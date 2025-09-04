import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCard } from './UserCard';
import { PostCard } from './PostCard';

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Smart Contract Developer',
    avatar: '',
    reputation: 2450,
    showReputation: true,
    badge: 'DeFi Expert',
    description: 'Experienced blockchain developer specializing in DeFi protocols and smart contract security audits.'
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    role: 'Web3 Designer',
    showReputation: false,
    badge: 'UI/UX Pioneer',
    description: 'Passionate about creating intuitive Web3 user experiences and decentralized application interfaces.'
  },
  {
    id: '3',
    name: 'Michael Thompson',
    role: 'Blockchain Analyst',
    reputation: 1890,
    showReputation: true,
    description: 'Data-driven blockchain researcher focused on tokenomics and market analysis for emerging protocols.'
  },
  {
    id: '4',
    name: 'Emma Davis',
    role: 'Community Manager',
    reputation: 3200,
    showReputation: true,
    badge: 'Community Leader',
    description: 'Building and nurturing Web3 communities across multiple blockchain ecosystems.'
  }
];

const mockPosts = [
  {
    id: '1',
    type: 'post' as const,
    author: {
      name: 'Sarah Chen',
      role: 'Smart Contract Developer',
      avatar: ''
    },
    content: 'Just deployed a new AMM contract with improved gas efficiency! The optimization reduced transaction costs by 30%. Check out the technical details in my latest blog post.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    visibility: 'public' as const,
    likes: 24,
    comments: 7,
    isLiked: false
  },
  {
    id: '2',
    type: 'job' as const,
    author: {
      name: 'TechCorp Inc.',
      role: 'Technology Company',
      avatar: ''
    },
    content: 'We are looking for a senior Solidity developer to join our DeFi team. Must have experience with yield farming protocols and cross-chain implementations.',
    jobTitle: 'Senior Solidity Developer',
    company: 'TechCorp Inc.',
    minReputation: 2000,
    salary: '$120k - $180k',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    visibility: 'public' as const,
    likes: 18,
    comments: 12,
    isLiked: true
  },
  {
    id: '3',
    type: 'post' as const,
    author: {
      name: 'Alex Rodriguez',
      role: 'Web3 Designer',
      avatar: ''
    },
    content: 'Working on a new wallet interface that makes Web3 interactions feel as smooth as Web2. The key is hiding complexity while maintaining transparency. What features do you think are essential?',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    visibility: 'encrypted' as const,
    likes: 31,
    comments: 15,
    isLiked: true
  },
  {
    id: '4',
    type: 'job' as const,
    author: {
      name: 'DeepDAO',
      role: 'Decentralized Organization',
      avatar: ''
    },
    content: 'Seeking a Web3 community manager to help grow our ecosystem. Remote work, competitive compensation in native tokens.',
    jobTitle: 'Community Manager',
    company: 'DeepDAO',
    minReputation: 1500,
    salary: '$80k + Tokens',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    visibility: 'public' as const,
    likes: 9,
    comments: 4,
    isLiked: false
  }
];

export const ExploreTabs = () => {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="space-y-4 mt-6">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </TabsContent>
      
      <TabsContent value="users" className="space-y-4 mt-6">
        <div className="grid gap-4">
          {mockUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};