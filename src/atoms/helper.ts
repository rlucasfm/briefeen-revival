interface ILocalStorageEffect {
    setSelf: CallableFunction;
    onSet: CallableFunction;
  }
  
export const localStorageEffect = (key: string) => {
    return ({ setSelf, onSet }: ILocalStorageEffect) => {
        if (typeof window !== 'undefined') {
            const savedValue = localStorage.getItem(key);

            if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
            }
    
            onSet((newValue: Record<string, string>) => {
                localStorage.setItem(key, JSON.stringify(newValue));
            });
        }
    };
};