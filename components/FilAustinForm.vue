<template>
  <div id="mc_embed_signup">
    <form
      id="mc-embedded-subscribe-form"
      action="https://fil.us14.list-manage.com/subscribe/post?u=955415dad19a9a5590c3949b0&amp;id=cb98f59ed6"
      method="post"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
      novalidate>
      <div id="mc_embed_signup_scroll">

        <div class="email-input-container">
          <input
            id="mce-EMAIL"
            type="email"
            value=""
            name="EMAIL"
            placeholder="Enter your email"
            class="required email" />
        </div>

        <div class="submit-button">
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.5 9.00004C0.5 8.68509 0.625111 8.38305 0.847811 8.16035C1.07051 7.93765 1.37256 7.81253 1.6875 7.81253H15.4459L10.3468 2.71579C10.1238 2.49281 9.9985 2.19038 9.9985 1.87504C9.9985 1.55969 10.1238 1.25727 10.3468 1.03429C10.5697 0.811305 10.8722 0.686035 11.1875 0.686035C11.5028 0.686035 11.8053 0.811305 12.0282 1.03429L19.1532 8.15928C19.2638 8.26959 19.3516 8.40064 19.4114 8.5449C19.4713 8.68917 19.5021 8.84384 19.5021 9.00004C19.5021 9.15623 19.4713 9.31089 19.4114 9.45516C19.3516 9.59943 19.2638 9.73048 19.1532 9.84079L12.0282 16.9658C11.8053 17.1888 11.5028 17.314 11.1875 17.314C10.8722 17.314 10.5697 17.1888 10.3468 16.9658C10.1238 16.7428 9.9985 16.4404 9.9985 16.125C9.9985 15.8097 10.1238 15.5073 10.3468 15.2843L15.4459 10.1875H1.6875C1.37256 10.1875 1.07051 10.0624 0.847811 9.83972C0.625111 9.61703 0.5 9.31498 0.5 9.00004Z"
              fill="#0718A7" />
          </svg>
          <input
            id="mc-embedded-subscribe"
            type="submit"
            value="Subscribe"
            name="subscribe"
            class="submit-input" />
        </div>

        <div id="mce-responses" class="clear">
          <div id="mce-error-response" class="response" />
          <div id="mce-success-response" class="response" />
        </div>

        <input
          type="text"
          name="b_955415dad19a9a5590c3949b0_cb98f59ed6"
          tabindex="-1"
          value=""
          class="floated"
          aria-hidden="true" />

      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
$dimension: 2.1875rem;

@mixin layeredStyle {
  position: relative;
  border: 2px solid $jordyBlue;
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    background-color: $azureRadiance;
    border-radius: inherit;
    z-index: -1;
  }
}

// ///////////////////////////////////////////////////////////////////// General
.response {
  display: none;
}

.floated {
  position: absolute;
  left: -5000px;
}

#mc_embed_signup_scroll {
  display: flex;
  flex-direction: row;
  @include tiny {
    flex-direction: column;
  }
}

.email-input-container {
  @include layeredStyle;
  flex: 1;
  height: $dimension;
  border-radius: $dimension;
  @include tiny {
    flex: auto;
  }
}

.email {
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  border: 0;
  border-radius: 2.1875rem;
  color: $blackPearl;
  background-color: $hawkesBlue;
  appearance: none;
  outline: none;
  @include placeholder {
    font-style: italic;
  }
}

.submit-button {
  @include layeredStyle;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: $dimension;
  height: $dimension;
  margin-left: 1rem;
  border-radius: $dimension;
  background-color: $hawkesBlue;
  @include tiny {
    margin-left: 0;
    margin-top: 1rem;
  }
  .submit-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>
