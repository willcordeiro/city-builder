import assets from './assets';

export function getAsset(id: string | undefined) {
  return assets[id as keyof typeof assets];
}