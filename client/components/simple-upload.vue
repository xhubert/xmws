<template>
  <div class="field">
    <input
      ref="uploadedFile"
      type="file"
      :accept="accept"
      :multiple="false"
      :disabled="disabled"
      style="height: 0; width: 0; border: none; background: transparent;"
      @change="onFileChange"
    >
    <v-btn
      ref="fileTextField"
      v-model="filename"
      :color="!filename ? 'primary' : 'error'"
      style="width: 85%; max-width: 300px;"
      @click.native="onClickFileBtn"
    >
      <v-icon left>
        {{ !filename? 'attachment' : 'cancel' }}
      </v-icon>
      {{ !filename? '选择文件...' : '取消' }}
    </v-btn>
    <div class="grey--text text--lighten-1">
      <small>{{ accept }}</small>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SimpleUpload',
    props: {
      value: {
        type: [Array, String],
        default: ''
      },
      accept: {
        type: String,
        default: '*'
      },
      label: {
        type: String,
        default: 'Please choose...'
      },
      required: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean, // not yet possible because of data
        default: false
      },
      callback: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        // file: '',
        filename: ''
      };
    },
    watch: {
      value(v) {
        this.filename = v;
      }
    },
    mounted() {
      this.filename = this.value;
    },
    methods: {
      getFormData(files) {
        const data = new FormData();
        [...files].forEach(file => {
          data.append('data', file, file.name); // currently only one file at a time
        });
        return data;
      },
      onClickFileBtn() {
        if (!this.filename) {
          this.$refs.uploadedFile.click();
        } else {
          // Cancel an in-progress upload.
          this.$refs.uploadedFile.value = '';
          // this.file = '';
          this.filename = '';
          this.callback('');
        }
      },
      onFileChange($event) {
        const files = $event.target.files || $event.dataTransfer.files;
        if (files && files[0]) {
          // this.file = files[0];
          this.callback(files);
        } else {
          // this.filename = $event.target.value.split('\\').pop();
          this.filename = '';
        }
        // const form = this.getFormData(files);
        // if (files) {
        //   if (files.length > 0) {
        //     this.filename = [...files].map(file => file.name).join(', ');

        //   } else {
        //     this.filename = null;
        //   }
        // } else {
        //   this.filename = $event.target.value.split('\\').pop();
        // }
        // this.$emit('input', this.filename);
        // this.$emit('formData', form);
      }
    }
  };
</script>

<style scoped>
  input[type='file'] {
    position: absolute;
    left: -99999px;
  }
  label {
    visibility: hidden;
    height: 1px;
    line-height: 1px;
    display: block;
  }
</style>
