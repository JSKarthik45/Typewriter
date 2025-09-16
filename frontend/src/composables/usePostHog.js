import posthog from 'posthog-js'

export function usePostHog() {
  posthog.init('phc_AnoL3Bw2w1DRKrP466Lyslf2UxmvxZ1LWCsk12Jcsgz', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2025-05-24',
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  })

  return { posthog }
}