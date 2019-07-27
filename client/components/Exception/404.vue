<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Exception404 extends Vue {
  render(h: any) {
    return (
      <div>
        <h2>404 NotFound</h2>
        <h1>
          您要找的页面不存在，
          <a style="color:#29d" onClick={() => this.$router.push('/')}>
            回首页看看~
          </a>
        </h1>
      </div>
    );
  }
}
</script>
