<template>
    <div class="flex flex-col justify-content-between min-h-100">
        <SharedNavbar />
        <main class="flex flex-1 h-100">
            <slot />
        </main>
        <SharedFooter />
    </div>
</template>
