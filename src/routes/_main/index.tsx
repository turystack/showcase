import { createFileRoute } from '@tanstack/react-router'

import { HeroSection, LibrariesSection } from '@/components'

export const Route = createFileRoute('/_main/')({
  component: () => (
    <>
      <HeroSection />
      <LibrariesSection />
    </>
  ),
})
