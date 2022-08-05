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
import Image from 'next/image';
import NextLink from 'next/link';
import { Children } from 'react';
import styles from './index.module.scss';

export function Index() {
  const phoneIllustration = (
    <Image
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
          <div className={styles.ctaInfoContainer}>
            <div className={styles.ctaInfo}>
              <Text my={4}>Welcome to Certify-d</Text>
              <Heading lineHeight={1.25} my={4} as="h1" size={'3xl'}>
                Certify all your documents online with Certify-d
              </Heading>
              <Text my={4}>
                Generate ceritified copies of official primary documents
              </Text>
              <Button my={4} w={120}>
                Get started
              </Button>
            </div>
          </div>
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
        <div className={styles.productUsageContanier}>
          <UsageStat usage="100+" description="Ceritified Documents" />
          <div className={styles.productUsageHLine} />
          <UsageStat usage="100+" description="Active Users" />
        </div>

        <div className={styles.productInfoContainer}>
          {Children.toArray(
            featureInfo.map((item, idx) => (
              <>
                <FeatureCard {...item} />
                <hr className={styles.productInfoSpacing} />
              </>
            ))
          )}
        </div>
      </div>

      <div id="Pricing"></div>

      <div id="ContactUs"></div>
    </div>
  );
}

const featureInfo: FeatureCardProps[] = [
  {
    header: ['Upload & Certify Documents'],
    text: 'Save time through our innovative, first and only, online document certification platform.',
    illustationSrc: '/static/images/girl-with-latop.svg',
  },
  {
    header: ['Commissioner of Oaths'],
    text: 'Trsuted to assist the community certify documents as true copies of the original documents.',
    textPosition: 'left',
    backgroundColor: 'none',
  },
  {
    header: ['Save time', 'Save money', 'Certify with Certify-d'],
    textPosition: 'left',
    illustationSrc: '/static/images/happy-dancing.svg',
  },
];

export default Index;
