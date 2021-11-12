/**
 * @file runtime 运行时
 * @author Auto Generated by IconPark
 */

import {ComponentOptions, DefineComponent, inject, provide} from 'alias-for-vue3';

// 描边连接类型
export type StrokeLinejoin = 'miter' | 'round' | 'bevel';

// 描边端点类型
export type StrokeLinecap = 'butt' | 'round' | 'square';

// 主题
export type Theme = 'outline' | 'filled' | 'two-tone' | 'multi-color';

// 包裹前的图标属性
export interface ISvgIconProps {

    // 当前图标的唯一Id
    id: string;

    // 图标尺寸大小，默认1em
    size: number | string;

    // 描边宽度
    strokeWidth: number;

    // 描边端点类型
    strokeLinecap: StrokeLinecap;

    // 描边连接线类型
    strokeLinejoin: StrokeLinejoin;

    // 换肤的颜色数组
    colors: string[];
}

// 图标配置属性
export interface IIconConfig {

    // 图标尺寸大小，默认1em
    size: number | string;

    // 描边宽度
    strokeWidth: number;

    // 描边端点类型
    strokeLinecap: StrokeLinecap;

    // 描边连接线类型
    strokeLinejoin: StrokeLinejoin;

    // CSS前缀
    prefix: string;

    // RTL是否开启
    rtl: boolean;

    // 默认主题
    theme: Theme;

    // 主题默认颜色
    colors: {

        outline: {
            fill: string;
            background: string;
        };

        filled: {
            fill: string;
            background: string;
        };

        twoTone: {
            fill: string;
            twoTone: string;
        };

        multiColor: {
            outStrokeColor: string;
            outFillColor: string;
            innerStrokeColor: string;
            innerFillColor: string;
        };
    };
}

// 图标基础属性
export interface IIconBase {

    // 图标尺寸大小，默认1em
    size?: number | string;

    // 描边宽度
    strokeWidth?: number;

    // 描边端点类型
    strokeLinecap?: StrokeLinecap;

    // 描边连接线类型
    strokeLinejoin?: StrokeLinejoin;

    // 默认主题
    theme?: Theme;

    // 填充色
    fill?: string | string[];
}

// 包裹后的图标属性
export interface IIconProps extends IIconBase {
    spin?: boolean;
}

// 包裹后的图标属性
export type IconOptions = ComponentOptions<IIconProps>;

// 包裹前的图标渲染器
export type IconRender = (props: ISvgIconProps) => JSX.Element;

// 包裹后的图标
export type Icon = DefineComponent<IIconProps>;

// 默认属性
export const DEFAULT_ICON_CONFIGS: IIconConfig = {
    size: '1em',
    strokeWidth: 4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    rtl: false,
    theme: 'outline',
    colors: {
        outline: {
            fill: '#333',
            background: 'transparent'
        },
        filled: {
            fill: '#333',
            background: '#FFF'
        },
        twoTone: {
            fill: '#333',
            twoTone: '#2F88FF'
        },
        multiColor: {
            outStrokeColor: '#333',
            outFillColor: '#2F88FF',
            innerStrokeColor: '#FFF',
            innerFillColor: '#43CCF8'
        }
    },
    prefix: 'i'
};

function guid(): string {
    return 'icon-' + (((1 + Math.random()) * 0x100000000) | 0).toString(16).substring(1);
}

// 属性转换函数
export function IconConverter(id: string, icon: IIconBase, config: IIconConfig): ISvgIconProps {

    const fill = typeof icon.fill === 'string' ? [icon.fill] : icon.fill || [];
    const colors: string[] = [];

    const theme: Theme = icon.theme || config.theme;

    switch (theme) {
        case 'outline':
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push('none');
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push('none');
            break;
        case 'filled':
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push('#FFF');
            colors.push('#FFF');
            break;
        case 'two-tone':
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.twoTone.twoTone);
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.twoTone.twoTone);
            break;
        case 'multi-color':
            colors.push(typeof fill[0] === 'string' ? fill[0] : 'currentColor');
            colors.push(typeof fill[1] === 'string' ? fill[1] : config.colors.multiColor.outFillColor);
            colors.push(typeof fill[2] === 'string' ? fill[2] : config.colors.multiColor.innerStrokeColor);
            colors.push(typeof fill[3] === 'string' ? fill[3] : config.colors.multiColor.innerFillColor);
            break;
    }

    return {
        size: icon.size || config.size,
        strokeWidth: icon.strokeWidth || config.strokeWidth,
        strokeLinecap: icon.strokeLinecap || config.strokeLinecap,
        strokeLinejoin: icon.strokeLinejoin || config.strokeLinejoin,
        colors,
        id
    };
}

const IconContext = Symbol('icon-context');

// 图标配置Provider
export const IconProvider = (config: IIconConfig) => {
    provide(IconContext, config);
};

// 图标Wrapper
export function IconWrapper(name: string, rtl: boolean, render: IconRender): Icon {

    const options: IconOptions = {
        name: 'icon-' + name,
        props: ['size', 'strokeWidth', 'strokeLinecap', 'strokeLinejoin', 'theme', 'fill', 'spin'],
        setup: (props) => {

            const id = guid();

            const ICON_CONFIGS = inject(IconContext, DEFAULT_ICON_CONFIGS);

            return () => {

                const {
                    size,
                    strokeWidth,
                    strokeLinecap,
                    strokeLinejoin,
                    theme,
                    fill,
                    spin
                } = props;

                const svgProps = IconConverter(id, {
                    size,
                    strokeWidth,
                    strokeLinecap,
                    strokeLinejoin,
                    theme,
                    fill
                }, ICON_CONFIGS);

                const cls: string[] = [ICON_CONFIGS.prefix + '-icon'];

                cls.push(ICON_CONFIGS.prefix + '-icon' + '-' + name);

                if (rtl && ICON_CONFIGS.rtl) {
                    cls.push(ICON_CONFIGS.prefix + '-icon-rtl');
                }

                if (spin) {
                    cls.push(ICON_CONFIGS.prefix + '-icon-spin');
                }

                return (
                    <span class={cls.join(' ')}>
                        {render(svgProps)}
                    </span>
                );
            };
        }
    };

    return options as Icon;
}
