<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
	<h1>{{ msg }}</h1>
	<el-button type="primary">Primary</el-button>
	<el-button type="success">Success</el-button>
</template>

<style scoped></style>
