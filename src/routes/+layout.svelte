<script>
  import Nabvar from "./../components/Nabvar.svelte";
  import Footer from "./../components/Footer.svelte";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Nabvar></Nabvar>

{@render children?.()}

<Footer></Footer>

<style>
</style>
