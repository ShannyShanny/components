<template>
    <ix-steps>
        <ix-step status="finish" title="Login" icon="user"></ix-step>
        <ix-step status="finish" title="Verification">
            <template #icon>
                <ix-icon name="verified" />
            </template>
        </ix-step>
        <ix-step status="process" title="Pay" icon="loading"></ix-step>
        <ix-step status="wait" title="Done" icon="smile"></ix-step>
    </ix-steps>
</template>