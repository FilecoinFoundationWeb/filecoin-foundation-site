<nuxt-link to="/">
  <LogoHorizontal id="logo-horizontal" />
</nuxt-link>

<nav
  v-if="!mobile"
  ref="navigation"
  class="navigation"
  @mouseleave="setActiveItem(-1)">

  <div
    v-for="(link, index) in links"
    :key="index"
    ref="navItems"
    :class="['nav-hover-wrapper', 'dropdown-background', 'nav-item-wrapper']"
    @mouseover="setActiveItem(index)">
    <div
      class="nav-link top-level">
      <div class="text">{{ link.text }}</div>
    </div>
  </div>

  <NavMegaMenu
    :panel="true"
    :activeIndex="activeItem"
    :nested-display="!mobile">
      <NavDropdown
        v-for="(link, index) in links"
        :key="`$dropdown-${index}-${componentKey}`"
        :link="link"
        :scroll="false"
        :nested-display="!mobile"
        :class="[{ active: index === activeItem }, { last: index === lastItem && activeItem >= 0 }, index === lastItem || index === activeItem ? direction : '']"
        behavior="hover">
      </NavDropdown>
  </NavMegaMenu>

</nav>

<Zero_Core__Accordion
  v-if="mobile"
  v-slot="{ active }">
  <Zero_Core__Accordion_Section
    v-for="(link, index) in links"
    :key="index"
    :active="active"
    :selected="true"
    class="nav-accordion-item">
    <Zero_Core__Accordion_Header>
      <div
        class="mobile-nav-heading"
        v-html="link.description">
      </div>
    </Zero_Core__Accordion_Header>
    <Zero_Core__Accordion_Content>
      <div class="accordion-content-wrapper">
        <div v-html="link.description"></div>
        <ul v-if="Array.isArray(link.links)">
          <li @click="toggleMobileNav">
            <Button
              :button="convertMainLinkToSublink(link)"
              class="nav-link first-level">
              {{ link.text }}
            </Button>
          </li>
          <li
            v-for="sublink in link.links"
            :key="`${link.text}-${sublink.text}`">

            <Button
              :button="sublink"
              :class="['nav-link', 'first-level', { 'has-second-level': sublink.hasOwnProperty('links') }]">
              {{ sublink.text }}
            </Button>

          </li>
        </ul>
      </div>
    </Zero_Core__Accordion_Content>
  </Zero_Core__Accordion_Section>
</Zero_Core__Accordion>

<div
  v-if="mobile"
  :class="['hamburger-icon', {'close-icon' : mobilePanelOpen}]"
  tabindex="0"
  @click="toggleMobileNav"
  @keyup.enter="toggleMobileNav">
  <div class="top"></div>
  <div class="middle"></div>
</div>
