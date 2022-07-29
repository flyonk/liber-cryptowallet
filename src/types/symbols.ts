import { InjectionKey } from 'vue';
import { UiKitInterface } from '@/types/uiKit';

export const uiKitKey: InjectionKey<UiKitInterface> = Symbol('uiKit');
