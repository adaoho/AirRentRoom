<script>
export default {
  name: 'CheckBox',
  props: ['label']
}
</script>
<template>
  <label class="label cursor-pointer justify-start gap-x-4">
    <input type="checkbox" class="checkbox checkbox-primary" />
    <span class="label-text">{{ label }}</span>
  </label>
</template>
