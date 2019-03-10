<template>
  <v-container fill-height>
    <VLayout align-center justify-center>
      <VFlex xs12 sm8 md6>
        <VCard>
          <VCardText class="pb-4 text-xs-center">
            <VIcon size="48" color="orange">
              info
            </VIcon>
            <h2>
              提示
            </h2>
            <div class="mb-2">
              当前没有任何库存数据！
            </div>
            <VDivider />
            <small class="grey--text text--lighten-1">
              你可以从亚马逊卖家中心的
              <span class="font-italic">"Report Center"</span>
              下载库存数据。<br />
              然后导入，即可完成库存数据分析。
              <span
                class="font-italic"
              >".xlsx"</span>
            </small>
            <VDivider />
            <div class="mt-2">
              <v-alert
                :value="!!uploadedFile"
                outline
                transition="scale-transition"
                color="success"
                style="padding: 8px;"
              >
                <v-progress-circular
                  :size="22"
                  :width="2"
                  color="green"
                  indeterminate
                ></v-progress-circular>
                &nbsp; 正在上传并分析文件 [
                <strong class="font-italic"> {{ uploadedFile.name }} </strong>
                ].
              </v-alert>
              <SimpleUpload
                :accept="accept"
                :callback="onFileChange"
              />
            </div>
          </VCardText>
        </VCard>
      </VFlex>
    </VLayout>
  </v-container>
</template>

<script>
  import SimpleUpload from '../simple-upload.vue';
  import XLSX from 'xlsx';

  import Sleep from '@@/utils/sleep';

  const makeCols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1)
    .fill(0).map(
      (x, i) => ({
        name: XLSX.utils.encode_col(i),
        key: i
      })
    );
  const _SheetJSFT = ['xlsx', 'xls']
    .map(function(x) {
      return '.' + x;
    })
    .join(',');

  export default {
    components: {
      SimpleUpload
    },
    props: {
      onLoadData: {
        type: Function,
        default: (fileContents) => {}
      }
    },
    data: () => {
      return {
        uploadedFile: '',
        accept: _SheetJSFT
      };
    },
    methods: {
      async onFileChange(files) {
        if (files.length > 0 && files[0]) {
          this.uploadedFile = files[0];
          try {
            const fileContents = await this.analyseFile(this.uploadedFile);
            await Sleep(1000);
            this.onLoadData(fileContents);
          } catch (e) {
            console.warn(e.message);
          }
        }
      },
      async analyseFile(file) {
        const tmpFileReader = new FileReader();
        return new Promise((resolve, reject) => {
          tmpFileReader.onerror = () => {
            tmpFileReader.abort();
            reject(new DOMException('Problem parsing input file.'));
          };
          tmpFileReader.onload = e => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            const cols = makeCols(ws['!ref']);
            resolve({
              data, cols
            });
          };
          tmpFileReader.readAsBinaryString(file);
        });
      }
    }
  };
</script>
