<template>
  <form
    ref="fieldForm"
    :action="action"
    method="POST">

    <div
      v-for="(field, i) in fields"
      :key="`${field.type}-${i}`">
      <input
        ref="inputFields"
        :name="field.name"
        :type="field.type"
        :pattern="getValidationPattern(field.type)"
        :placeholder="field.label"
        :validation-message="field.validation"
        required="required"
        aria-required="true">
      <span
        v-if="field.validation"
        :key="`validation-${i}-${componentKey}`"
        :class="['validation-message', { display: !validMessages[i] }]">
        {{ field.validation }}
      </span>
    </div>

    <div>
      <div v-if="submitted">
        {{ message }}
      </div>
      <input
        type="submit"
        :value="submit"
        @click="onFormSubmit" />
    </div>

  </form>
</template>

<script>

export default {
  name: 'FieldForm',

  props: {
    fields: {
      type: Array,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    submit: {
      type: String,
      required: false,
      default: 'Submit'
    },
    message: {
      type: String,
      required: false,
      default: 'Submitted'
    }
  },

  data () {
    return {
      validMessages: new Array(this.fields.length).fill(true),
      componentKey: 0
    }
  },

  computed: {
    submitted () {
      return this.$route.query.submit === 'success'
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (this.$route.query.submit === 'success' && this.$refs.contactForm) {
        this.$scrollToElement(this.$refs.contactForm, 0, -50)
      }
    })
  },

  methods: {
    onFormSubmit () {
      this.$refs.inputFields.forEach((field, i) => {
        this.validMessages[i] = field.checkValidity()
      })
      this.componentKey++
    },
    getValidationPattern (type) {
      switch (type) {
        case 'email': return '[a-zA-Z0-9!#$%&\'*+\-/=?^_{|}~]{1,100}@[a-zA-Z0-9\-]{2,64}.[a-zA-Z.]{2,27}'
        case 'phone': return '[-0-9xs()+{}#]{6,31}'
        case 'name': return '[^0-9]{2,100}'
        case 'message': return '.{50,25000}'
        case 'subject': return '.{1,200}'
        default : return null
      }
    }
  }
}

</script>

<style lang="scss" scoped>

input, select, textarea{
  color: black;
}

.validation-message {
  display: none;
  &.display {
    display: inline;
  }
}

</style>
