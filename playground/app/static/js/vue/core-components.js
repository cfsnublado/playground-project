const AdminMixin = {
  props: {
    initIsAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAdmin: this.initIsAdmin
    }
  },
}

const AjaxProcessMixin = {
  props: {
    parentProcessing: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      processing: false
    }
  },
  methods: {
    process() {
      this.processing = true
      this.$emit('ajax-process')
    },
    complete() {
      this.processing = false
      this.$emit('ajax-complete')
    },
    success() {
      this.processing = false
      this.$emit('ajax-success')
    }
  }
}

const ClickOutsideMixin = {
  methods: {
    onClickOutside() {
      console.log('clicked outside')
    },
    clickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.onClickOutside()
      }
    },
    addClickOutsideHandler() {
      window.addEventListener('click', this.clickOutside)
    },
    removeClickOutsideHandler() {
      window.removeEventListener('click', this.clickOutside)
    }
  },
  created() {
    this.addClickOutsideHandler()
  },
  beforeDestroy() {
    this.removeClickOutsideHandler()
  }
}

const PaginationMixin = {
  data() {
    return {
      previousUrl: null,
      nextUrl: null,
      pageNum: null,
      pageCount: null,
      resultsCount: null
    }
  },
  methods: {
    setPagination(previousUrl, nextUrl, pageNum, resultsCount, pageCount) {
      this.previousUrl = previousUrl
      this.nextUrl = nextUrl
      this.pageNum = pageNum
      this.resultsCount = resultsCount
      this.pageCount = pageCount
    }
  }
}

const MarkdownMixin = {
  data() {
    return {
      converter: new showdown.Converter()
    }
  },
  methods: {
    markdownToHtml(markdown) {
      return this.converter.makeHtml(markdown)
    }
  }
}

const VisibleMixin = {
  props: {
    initIsVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isVisible: this.initIsVisible
    }
  }
}

const BaseMessage = {
  props: {
    messageType: {
      type: String,
      default: 'success'
    },
    messageText: {
      type: String,
      default: ''
    },
    initAutoClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: true,
      timerId: null,
      timerDelay: 3000,
      autoClose: this.initAutoClose
    }
  },
  methods: {
    close() {
      clearTimeout(this.timerId)
      this.isOpen = false
    },
    load() {
      if (this.autoClose) {
        this.timerId = setTimeout(()=>{
          this.close()
        }, this.timerDelay) 
      }
    }
  },
  created() {
    this.load()
  },
}

const BaseModal = {
  props: {
    initId: {
      type: String,
      default: 'modal'
    }
  },
  data() {
    return {
      modalId: this.initId,
      modalEnabled: true,
      isOpen: false,
    }
  },
  methods: {
    show(params) {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
  }
}

const BaseDropdown = {
  mixins: [ClickOutsideMixin],
  props: {
    id: {
      type: String,
      required: true
    },
    dropdownClasses: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggle(manual) {
      this.$emit('toggle')
      if (manual === true || manual === false) {
        this.isOpen = manual
      } else {
          this.isOpen = !this.isOpen
      }
    },
    onClickOutside() {
      this.isOpen = false
    }
  }
}

/** Search/Autocomplete **/

const BaseSearch = {
  mixins: [
    ClickOutsideMixin,
  ],
  props: {
    id: {
      type: String,
      default: 'search'
    },
    initSearchTerm: {
      type: String,
      default: ''
    },
    initAutocompleteUrl: {
      type: String,
      required: true
    },
    initSearchUrl: {
      type: String,
      default: ''
    },
    searchOnSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchTerm: this.initSearchTerm,
      searchParams: {
        term: ''
      },
      results: [],
      isOpen: false,
      searchTimerId: null,
      searchDelay: 600,
      minSearchLength: 2,
      autocompleteUrl: this.initAutocompleteUrl,
      searchUrl: this.initSearchUrl
    }
  },
  methods: {
    setResult(result) {
      this.searchTerm = result
      this.isOpen = false
    },
    search() {
      console.log('search')
    },
    success(response) {
      if (response.data.length) {
        this.results = response.data
        this.isOpen = true
      } else {
        this.isOpen = false
      }
    },
    onAutocomplete() {
      clearTimeout(this.searchTimerId)
      this.searchTimerId = setTimeout(()=>{
        if (this.searchTerm.length >= this.minSearchLength) {

          this.searchParams.term = this.searchTerm

          axios.get(this.autocompleteUrl, {
            params: this.searchParams
          })
          .then(response => {
            this.success(response)
          })
          .catch(error => {
            this.error(error)
            if (error.response) {
              console.log(error.response)
            } else if (error.request) {
              console.log(error.request)
            } else {
              console.log(error.message)
            }
            console.log(error.config)
          })
          .finally(() => {})
        } else {
          this.isOpen = false
        }
      }, this.searchDelay)
    },
    onFocus() {
      this.$emit('search-focus')
    },
    onClickOutside() {
      this.isOpen = false
      // this.searchTerm = ''
    },   
  }
}

const BaseLanguageSearch = {
  mixins: [BaseSearch],
  props: {
    initLanguage: {
      type: String,
      default: 'en'
    }
  },
  data() {
    return {
      language: this.initLanguage,
      languageUrl: ''
    }
  },
  methods: {
    setLanguage(lang) {
      this.language = lang
      this.autocompleteUrl = this.languageUrl.replace('zz', this.language)
      this.onAutocomplete()
    },
    search() {
      url = this.searchUrl + '?search_term=' + this.searchTerm + '&search_language=' + this.language
      window.location.assign(url);
    }
  },
  created() {
    this.languageUrl = this.autocompleteUrl
    this.autocompleteUrl = this.languageUrl.replace('zz', this.language)
  },
}

/** Tags **/

const BaseTag = {
  mixins: [VisibleMixin],
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    },
    hasRemove: {
      type: Boolean,
      default: false
    },
    selectRedirectUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    select() {
      if (this.selectRedirectUrl) {
        window.location.assign(this.selectRedirectUrl)
      }

      this.$emit('select-tag', this.id)
    },
    remove() {
      this.$emit('remove-tag', this.id)
    }
  },
  template: `
    <div 
    class="tag"
    v-show="isVisible"
    >
      <a 
      @click.prevent="select"
      > 
      {{ value }} 
      </a>

      <a
      v-if="hasRemove"
      @click.prevent="remove"
      >
      &nbsp;
      <i class="fa-times fas"></i>
      </a>
    </div>
  `
}

const BaseToggleTag = {
  mixins: [BaseTag],
  props: {
    toggleSelect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle-tag', this.id)
    },
  },
  template: `
    <transition name="fade-transition" v-on:after-enter="isVisible = true" v-on:after-leave="isVisible = false">
    <div 
    class="tag"
    v-show="isVisible"
    >
      <a 
      @click.prevent="select"
      > 
      {{ value }} 
      </a>
    
      <a 
      @click.prevent="toggle"
      >
      &nbsp; <i v-bind:class="[toggleSelect ? 'fa-check-square' : 'fa-square', 'fas']"></i>
      </a>

    </div>
    
    </transition>
  `
}

const BaseTagbox = {
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    addTag(tag) {
      this.$emit('add-tag', tag)
    },
    removeTag(index) {
      this.$emit('remove-tag', index)
    },
    selectTag(index) {
      this.$emit('select-tag', index)
    },
    focusTagInput() {
      this.$emit('focus-tag-input')
    }
  }
}

