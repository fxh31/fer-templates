# 模板须知

## Axios

### 统一 restful 响应格式
```ts
interface Result<T = any> {
  code: number;
  msg: string;
  data?: T;
}
```