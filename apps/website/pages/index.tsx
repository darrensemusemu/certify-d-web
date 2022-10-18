import {
  Button,
  Heading,
  HomeContainer,
  Link,
  Text,
} from '@certify-d/shared-ui';
import {
  FeatureCard,
  FeatureCardProps,
  TestimonyCard,
  UsageStat,
} from '@certify-d/website-ui';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Children } from 'react';
import styles from './index.module.scss';

export function Index() {
  const phoneIllustration = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="phone illustration"
      src={'/static/images/phone-illustration.svg'}
      height={331}
      width={277}
    />
  );

  const reviewerCard = (
    <div className={styles.ctaTestimony}>
      <TestimonyCard avatarUrl="/static/images/reviewer-avatar.png" />
    </div>
  );

  return (
    <div>
      <div id="Home" className={styles.ctaContainer}>
        <HomeContainer
          illustration={phoneIllustration}
          secondaryIllustration={reviewerCard}
        >
          <Box className={styles.ctaInfoContainer} p={{ base: 4, lg: 16 }}>
            <Text my={4}>Welcome to Certify-d</Text>
            <Heading lineHeight={1.25} my={4} as="h1" size={'3xl'}>
              Certify all your documents online with Certify-d
            </Heading>
            <Text my={4}>
              Generate certified copies of official primary documents
            </Text>
            <NextLink href="/dash/auth/login" passHref>
              <Link>
                <Button my={4} w={120}>
                  Get started
                </Button>
              </Link>
            </NextLink>
          </Box>
        </HomeContainer>
      </div>

      <div className={styles.ctaArrow}>
        <NextLink href="#Product" passHref>
          <Link>
            <Text>Explore</Text>
            <TriangleDownIcon w={4} h={4} />
          </Link>
        </NextLink>
      </div>

      <div id="Product">
        <div className={styles.productUsageContainer}>
          <Box w={{ base: '40%', lg: '18.75em' }}>
            <UsageStat usage="100+" description="Certified Documents" />
          </Box>
          <div className={styles.productUsageHLine} />
          <Box w={{ base: '40%', lg: '18.75em' }}>
            <UsageStat usage="100+" description="Active Users" />
          </Box>
        </div>

        <div className={styles.productInfoContainer}>
          {Children.toArray(
            featureInfo.map((item, idx) => (
              <Box
                key={item.text}
                p={{ base: 4 }}
                width={{ base: '100%', lg: '70%' }}
              >
                <FeatureCard {...item} />
              </Box>
            ))
          )}
        </div>
      </div>

      <div id="Pricing" className={styles.pricingContainer}>
        <Heading
          lineHeight={1.25}
          my={4}
          as="h1"
          size={'2xl'}
          fontWeight={'extrabold'}
        >
          Convenient Pricing
        </Heading>
      </div>

      <div id="ContactUs"></div>
    </div>
  );
}

const featureInfo: FeatureCardProps[] = [
  {
    header: ['Upload & Certify Documents'],
    text: 'Save time through our innovative, first and only, online document certification platform.',
    illustrationSrc: '/static/images/girl-with-latop.svg',
  },
  {
    header: ['Commissioner of Oaths'],
    text: 'Trusted to assist the community certify documents as true copies of the original documents.',
    backgroundColor: 'none',
  },
  {
    header: ['Save time', 'Save money', 'Certify with Certify-d'],
    illustrationSrc: '/static/images/happy-dancing.svg',
  },
];

export default Index;
