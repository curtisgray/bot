import HomeContext from "@/pages/api/home/home.context";
import { AIModel, Vendors } from "@/types/ai";
import { IconExternalLink, IconBrandOpenai } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useContext } from "react";
import Select from "react-select";

export const ModelSelect = () => {
    const { t } = useTranslation("chat");

    const iconSize = 18;

    const {
        state: { selectedConversation, models, defaultModelId },
        handleUpdateConversation,
        dispatch: homeDispatch,
    } = useContext(HomeContext);

    const hasVendor = ({ model }: { model: AIModel }): boolean => {
        return Object.keys(Vendors).includes(model.vendor);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (selectedConversation) {
            handleUpdateConversation(selectedConversation, {
                key: "model",
                value: models.find(
                    (model) => model.id === e.target.value
                ) as AIModel,
            });
        }
    };

    const handleReactSelectChange = (e: any) => {
        if (selectedConversation) {
            handleUpdateConversation(selectedConversation, {
                key: "model",
                value: models.find((model) => model.id === e.value) as AIModel,
            });
        }
    };

    const handleStartDownload = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
    };

    const handleQuantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (selectedConversation?.model?.quantizations) {
            const quant = selectedConversation?.model?.quantizations.find(
                (quant) => quant === e.target.value
            );
        }
    };

    const modelVendor = (model: AIModel | undefined) => {
        if (!model) return "";
        // check if the vendor exists in the Vendors enum
        if (!Vendors.hasOwnProperty(model.vendor))
            throw new Error("Invalid vendor");
        const vendor = Vendors[model.vendor];
        if (!vendor) {
            return <span>{model.vendor}</span>;
        } else {
            return (
                <div className="flex space-x-1">
                    <Image
                        src={vendor.logo}
                        width={iconSize}
                        alt={vendor.displayName}
                    />
                    <span>{vendor.displayName}</span>
                </div>
            );
        }
    };

    const modelDisplay = (model: AIModel | undefined) => {
        if (!model) return "";
        // const vendor = Vendors[model.vendor];
        if (model.id === selectedConversation?.model?.id) {
            // this model is selected
            if (model.id === defaultModelId)
                return <span>Default ({model.name})</span>;
            else return <span>{model.name}</span>;
        } else {
            if (model.id === defaultModelId) {
                return (
                    <span>
                        {/* Default ({vendor.displayName}: {model.name}) */}
                        Default ({model.name})
                    </span>
                );
            } else {
                return <span>{model.name}</span>;
            }
        }
    };

    const groupedModelList = Object.values(Vendors)
        .filter((vendor) => vendor.isEnabled)
        .map((vendor) => ({
            label: vendor.displayName,
            options: models
                .filter((model) => model.vendor === vendor.name)
                .map((model) => ({
                    value: model.id,
                    label: modelDisplay(model),
                })),
        }));

    // const reactSelectColors = {
    //     /*
    //      * multiValue(remove)/color:hover
    //      */
    //     danger: "var(--danger)",

    //     /*
    //      * multiValue(remove)/backgroundColor(focused)
    //      * multiValue(remove)/backgroundColor:hover
    //      */
    //     dangerLight: "var(--danger-light)",

    //     /*
    //      * control/backgroundColor
    //      * menu/backgroundColor
    //      * option/color(selected)
    //      */
    //     neutral0: "rgb(23 23 23 / var(--tw-text-opacity))",

    //     /*
    //      * control/backgroundColor(disabled)
    //      */
    //     neutral5: "var(--neutral-5)",

    //     /*
    //      * control/borderColor(disabled)
    //      * multiValue/backgroundColor
    //      * indicators(separator)/backgroundColor(disabled)
    //      */
    //     neutral10: "var(--neutral-10)",

    //     /*
    //      * control/borderColor
    //      * option/color(disabled)
    //      * indicators/color
    //      * indicators(separator)/backgroundColor
    //      * indicators(loading)/color
    //      */
    //     neutral20: "var(--neutral-20)",

    //     /*
    //      * control/borderColor(focused)
    //      * control/borderColor:hover
    //      */
    //     neutral30: "var(--neutral-30)",

    //     /*
    //      * menu(notice)/color
    //      * singleValue/color(disabled)
    //      * indicators/color:hover
    //      */
    //     neutral40: "var(--neutral-40)",

    //     /*
    //      * placeholder/color
    //      */
    //     neutral50: "var(--neutral-50)",

    //     /*
    //      * indicators/color(focused)
    //      * indicators(loading)/color(focused)
    //      */
    //     neutral60: "var(--neutral-60)",

    //     neutral70: "var(--neutral-70)",

    //     /*
    //      * input/color
    //      * multiValue(label)/color
    //      * singleValue/color
    //      * indicators/color(focused)
    //      * indicators/color:hover(focused)
    //      */
    //     neutral80: "var(--neutral-80)",

    //     neutral90: "var(--neutral-90)",

    //     /*
    //      * control/boxShadow(focused)
    //      * control/borderColor(focused)
    //      * control/borderColor:hover(focused)
    //      * option/backgroundColor(selected)
    //      * option/backgroundColor:active(selected)
    //      */
    //     primary: "var(--primary)",

    //     /*
    //      * option/backgroundColor(focused)
    //      */
    //     primary25: "red",

    //     /*
    //      * option/backgroundColor:active
    //      */
    //     primary50: "var(--primary-50)",

    //     primary75: "var(--primary-75)",
    // };

    return (
        <div className="flex flex-col">
            <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
                {modelVendor(selectedConversation?.model)}
            </label>
            <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
                <Select
                    placeholder={t("Select a model") || ""}
                    options={groupedModelList}
                    isSearchable={true}
                    hideSelectedOptions={true}
                    //             value={modelOptions().filter(function(option) {
                    //   return option.options.find(function(option) {
                    //     return option.value === selectedConversation?.model?.id;
                    //   });
                    // })}
                    onChange={handleReactSelectChange}
                    // unstyled
                    // classNames={{
                    //     control: () => "w-full bg-transparent p-2",
                    // }}
                    // theme={(theme) => ({
                    //     ...theme,
                    //     colors: reactSelectColors,
                    // })}
                    className="my-react-select-container"
                    classNamePrefix="my-react-select"
                />
                {/* <select
                    className="w-full bg-transparent p-2"
                    placeholder={t("Select a model") || ""}
                    value={selectedConversation?.model?.id || defaultModelId}
                    onChange={handleChange}
                >
                    {models.map((model) => (
                        <option
                            key={model.id}
                            value={model.id}
                            className="dark:bg-[#343541] dark:text-white"
                        >
                            {modelDisplay(model)}
                        </option>
                    ))}
                </select> */}
            </div>
            {selectedConversation?.model?.vendor ===
                Vendors.huggingface.name && (
                <div className="w-full flex flex-col mt-3 text-left text-neutral-700 dark:text-neutral-400">
                    <label>{t("Model quantization")}</label>
                    <select
                        className="w-full bg-transparent p-2 mt-2"
                        placeholder={t("Select a model") || ""}
                        value={
                            selectedConversation?.model?.id || defaultModelId
                        }
                        onChange={handleQuantChange}
                    >
                        {selectedConversation?.model?.quantizations?.map(
                            (quant) => (
                                <option
                                    key={quant}
                                    value={quant}
                                    className="dark:bg-[#343541] dark:text-white"
                                >
                                    {quant}
                                </option>
                            )
                        )}
                    </select>
                    {/* {selectedConversation?.model?.isDownloaded ? (<span className="self-center m-2">Model is downloaded</span>):
                    (<button className="w-min self-center bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={handleStartDownload}>{t("Download model")}</button>)} */}
                </div>
            )}
            {selectedConversation?.model?.vendor === Vendors.openai.name && (
                <div className="w-full mt-3 text-left text-neutral-700 dark:text-neutral-400 flex items-center">
                    <a
                        href="https://platform.openai.com/account/usage"
                        target="_blank"
                        className="flex items-center"
                    >
                        <IconExternalLink size={18} className={"inline mr-1"} />
                        {t("View OpenAI Account Usage")}
                    </a>
                </div>
            )}
            {selectedConversation?.model?.vendor !== undefined &&
                Vendors[selectedConversation?.model?.vendor].isDownloadable &&
                (selectedConversation?.model?.isDownloaded ? (
                    <span className="self-center m-2">Model is downloaded</span>
                ) : (
                    <button
                        className="w-min self-center bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={handleStartDownload}
                    >
                        {t("Download model")}
                    </button>
                ))}
        </div>
    );
};
