<template>
    <b-container>
        <footer v-html="content">
        </footer>
    </b-container>
</template>
<script>
import render from './render';
import handleResponse from './handleResponse';

export default {
  data() {
    return {
      content: '',
    };
  },
  methods: {
    updateContent(filePath) {
      fetch(filePath)
        .then(response => handleResponse(response))
        .then((markdown) => { this.content = render(markdown); })
        .catch((/* reason */) => { /* console.log(reason); */ });
    },
  },
  mounted() {
    this.updateContent('_footer.md');
  },
};
</script>
