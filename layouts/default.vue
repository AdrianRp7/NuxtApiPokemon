<template>
    <div class="flex flex-col justify-content-between min-h-100">
        <SharedNavbar />
        <main class="mx-auto container flex flex-1 h-100 py-4 px-2">
            <slot />
        </main>
        <SharedFooter />
    </div>
</template>
