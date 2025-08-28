<!-- ArrowIcon.svelte -->

<script>
    export let direction = 'right'; // Default direction is right
</script>

<style>
    .arrow-icon {
        font-size: 1.5em; /* Adjust size as needed */
    }
</style>

<span class="arrow-icon h-10 text-[#333]">
    {#if direction === "left"}
        &larr;
    {:else if direction === "right"}
        &rarr;
    {:else if direction === "up"}
        &uarr;
    {:else if direction === "down"}
        &darr;
    {:else if direction === "remove"}
        &times;
    {/if}
</span>
