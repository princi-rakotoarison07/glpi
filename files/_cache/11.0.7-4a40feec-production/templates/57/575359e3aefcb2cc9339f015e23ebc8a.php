<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* components/helpdesk_forms/service_catalog_items.html.twig */
class __TwigTemplate_3b42931cf9da3aa1765d2fa0a64fc843 extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 32
        yield "
";
        // line 33
        if (array_key_exists("ancestors", $context)) {
            // line 34
            yield "    <span id=\"category-ancestors\" data-ancestors=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(json_encode(($context["ancestors"] ?? null)), "html", null, true);
            yield "\" style=\"display: none;\"></span>
";
        }
        // line 36
        yield "
";
        // line 37
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["items"] ?? null));
        $context['_iterated'] = false;
        foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
            // line 38
            yield "    ";
            if ($this->extensions['Glpi\Application\View\Extension\PhpExtension']->isInstanceOf($context["item"], "Glpi\\Form\\ServiceCatalog\\ServiceCatalogLeafInterface")) {
                // line 39
                yield "        ";
                yield Twig\Extension\CoreExtension::include($this->env, $context, "components/helpdesk_forms/service_catalog_item.html.twig", ["item" =>                 // line 41
$context["item"]], false);
                // line 43
                yield "
    ";
            }
            // line 45
            yield "    ";
            if ($this->extensions['Glpi\Application\View\Extension\PhpExtension']->isInstanceOf($context["item"], "Glpi\\Form\\ServiceCatalog\\ServiceCatalogCompositeInterface")) {
                // line 46
                yield "        ";
                if ((($tmp = ($context["expand_categories"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                    // line 47
                    yield "            <div class=\"col-12 d-flex\">
                ";
                    // line 48
                    $context["unique_dom_id"] = ("service-catalog-tree-" . Twig\Extension\CoreExtension::random($this->env->getCharset()));
                    // line 49
                    yield "                <section
                    class=\"card mx-1 my-2 flex-grow-1\"
                    aria-labelledby=\"";
                    // line 51
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["unique_dom_id"] ?? null), "html", null, true);
                    yield "\"
                >
                    <div class=\"card-body\">
                        <div class=\"card-title mb-0 d-flex align-items-center w-100\">
                            <h2 id=\"";
                    // line 55
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["unique_dom_id"] ?? null), "html", null, true);
                    yield "\" class=\"mb-0 fs-2\">
                                ";
                    // line 56
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["item"], "getServiceCatalogItemTitle", [], "method", false, false, false, 56), "html", null, true);
                    yield "
                            </h2>
                            <div class=\"card-subtitle ms-2 remove-last-tinymce-margin\">
                                ";
                    // line 59
                    yield $this->extensions['Glpi\Application\View\Extension\DataHelpersExtension']->getSafeHtml(CoreExtension::getAttribute($this->env, $this->source, $context["item"], "getServiceCatalogItemDescription", [], "method", false, false, false, 59));
                    yield "
                            </div>
                        </div>
                    </div>
                    <div class=\"card-body p-0\">
                        <div class=\"row g-0\">
                            ";
                    // line 65
                    $context['_parent'] = $context;
                    $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, $context["item"], "getChildren", [], "method", false, false, false, 65));
                    foreach ($context['_seq'] as $context["_key"] => $context["child"]) {
                        // line 66
                        yield "                                ";
                        yield Twig\Extension\CoreExtension::include($this->env, $context, "components/helpdesk_forms/service_catalog_nested_item.html.twig", ["child" =>                         // line 68
$context["child"]], false);
                        // line 70
                        yield "
                            ";
                    }
                    $_parent = $context['_parent'];
                    unset($context['_seq'], $context['_key'], $context['child'], $context['_parent']);
                    $context = array_intersect_key($context, $_parent) + $_parent;
                    // line 72
                    yield "                        </div>
                    </div>
                </section>
            </div>
        ";
                } else {
                    // line 77
                    yield "            ";
                    yield Twig\Extension\CoreExtension::include($this->env, $context, "components/helpdesk_forms/service_catalog_item.html.twig", ["item" =>                     // line 79
$context["item"]], false);
                    // line 81
                    yield "
        ";
                }
                // line 83
                yield "    ";
            }
            $context['_iterated'] = true;
        }
        // line 84
        if (!$context['_iterated']) {
            // line 85
            yield "    ";
            if ((($tmp = ($context["is_default_search"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                // line 86
                yield "        ";
                // line 87
                yield "        ";
                $context["empty_title"] = __("There are no forms available");
                // line 88
                yield "        ";
                $context["empty_subtitle"] = __("Please try again later.");
                // line 89
                yield "    ";
            } else {
                // line 90
                yield "        ";
                // line 91
                yield "        ";
                $context["empty_title"] = __("No forms found");
                // line 92
                yield "        ";
                $context["empty_subtitle"] = __("Try different keywords or filters.");
                // line 93
                yield "    ";
            }
            // line 94
            yield "    <div class=\"empty\">
        <p class=\"empty-title\">";
            // line 95
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["empty_title"] ?? null), "html", null, true);
            yield "</p>
        <p class=\"empty-subtitle text-secondary\">
            ";
            // line 97
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["empty_subtitle"] ?? null), "html", null, true);
            yield "
        </p>
    </div>
";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['item'], $context['_parent'], $context['_iterated']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 101
        yield "
";
        // line 103
        $context["sort_strategy"] = ((array_key_exists("sort_strategy", $context)) ? (Twig\Extension\CoreExtension::default(($context["sort_strategy"] ?? null), "popularity")) : ("popularity"));
        // line 104
        if ((($context["total"] ?? null) > ($context["items_per_page"] ?? null))) {
            // line 105
            yield "    ";
            $context["total_pages"] = Twig\Extension\CoreExtension::round((((($context["total"] ?? null) + ($context["items_per_page"] ?? null)) - 1) / ($context["items_per_page"] ?? null)), 0, "floor");
            // line 106
            yield "    ";
            $context["adjacents"] = 2;
            // line 107
            yield "    ";
            $context["skip_adjacents"] = false;
            // line 108
            yield "
    <nav aria-label=\"";
            // line 109
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Service catalog pages"), "html", null, true);
            yield "\">
        <ul class=\"pagination justify-content-center mt-4\">
            ";
            // line 112
            yield "            <li class=\"page-item ";
            yield (((($context["current_page"] ?? null) <= 1)) ? ("disabled") : (""));
            yield "\">
                <a
                    class=\"page-link d-flex justify-content-center\"
                    href=\"?";
            // line 115
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => 1, "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
            yield "\"
                    data-children-url-parameters=\"";
            // line 116
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => 1, "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
            yield "\"
                    data-pagination-item
                    aria-label=\"";
            // line 118
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("First page"), "html", null, true);
            yield "\"
                    ";
            // line 119
            yield (((($context["current_page"] ?? null) <= 1)) ? ("aria-disabled=\"true\"") : (""));
            yield "
                >
                    <i class=\"ti ti-chevrons-left\"></i>
                </a>
            </li>
            <li class=\"page-item ";
            // line 124
            yield (((($context["current_page"] ?? null) <= 1)) ? ("disabled") : (""));
            yield "\">
                <a
                    class=\"page-link d-flex justify-content-center\"
                    href=\"?";
            // line 127
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => (($context["current_page"] ?? null) - 1), "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
            yield "\"
                    data-children-url-parameters=\"";
            // line 128
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => (($context["current_page"] ?? null) - 1), "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
            yield "\"
                    data-pagination-item
                    aria-label=\"";
            // line 130
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Previous page"), "html", null, true);
            yield "\"
                    ";
            // line 131
            yield (((($context["current_page"] ?? null) <= 1)) ? ("aria-disabled=\"true\"") : (""));
            yield "
                >
                    <i class=\"ti ti-chevron-left\"></i>
                </a>
            </li>

            ";
            // line 138
            yield "            ";
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(range(1, ($context["total_pages"] ?? null)));
            foreach ($context['_seq'] as $context["_key"] => $context["page"]) {
                // line 139
                yield "                ";
                if ((((($context["current_page"] ?? null) - ($context["adjacents"] ?? null)) <= $context["page"]) && ((($context["current_page"] ?? null) + ($context["adjacents"] ?? null)) >= $context["page"]))) {
                    // line 140
                    yield "                    <li class=\"d-none d-sm-block page-item ";
                    yield ((($context["page"] == ($context["current_page"] ?? null))) ? ("active selected") : (""));
                    yield "\">
                        <a
                            class=\"page-link d-flex justify-content-center\"
                            href=\"?";
                    // line 143
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => $context["page"], "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
                    yield "\"
                            data-children-url-parameters=\"";
                    // line 144
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => $context["page"], "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
                    yield "\"
                            data-pagination-item
                            ";
                    // line 146
                    yield ((($context["page"] == ($context["current_page"] ?? null))) ? ("aria-current=\"page\"") : (""));
                    yield "
                        >
                            ";
                    // line 148
                    yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["page"], "html", null, true);
                    yield "
                        </a>
                    </li>
                    ";
                    // line 151
                    if (((($context["current_page"] ?? null) + ($context["adjacents"] ?? null)) == $context["page"])) {
                        // line 152
                        yield "                        ";
                        $context["skip_adjacents"] = false;
                        // line 153
                        yield "                    ";
                    }
                    // line 154
                    yield "                ";
                } elseif ((($context["skip_adjacents"] ?? null) == false)) {
                    // line 155
                    yield "                    ";
                    $context["skip_adjacents"] = true;
                    // line 156
                    yield "                    <li class=\"d-none d-sm-block page-item disabled\">
                        <a class=\"page-link\" href=\"#\" aria-disabled=\"true\">...</a>
                    </li>
                ";
                }
                // line 160
                yield "            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_key'], $context['page'], $context['_parent']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 161
            yield "
            ";
            // line 163
            yield "            <li class=\"page-item ";
            yield (((($context["current_page"] ?? null) >= ($context["total_pages"] ?? null))) ? ("disabled") : (""));
            yield "\">
                <a
                    class=\"page-link d-flex justify-content-center\"
                    href=\"?";
            // line 166
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => (($context["current_page"] ?? null) + 1), "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
            yield "\"
                    data-children-url-parameters=\"";
            // line 167
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => (($context["current_page"] ?? null) + 1), "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
            yield "\"
                    data-pagination-item
                    aria-label=\"";
            // line 169
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Next page"), "html", null, true);
            yield "\"
                    ";
            // line 170
            yield (((($context["current_page"] ?? null) >= ($context["total_pages"] ?? null))) ? ("aria-disabled=\"true\"") : (""));
            yield "
                >
                    <i class=\"ti ti-chevron-right\"></i>
                </a>
            </li>
            <li class=\"page-item ";
            // line 175
            yield (((($context["current_page"] ?? null) >= ($context["total_pages"] ?? null))) ? ("disabled") : (""));
            yield "\">
                <a
                    class=\"page-link d-flex justify-content-center\"
                    href=\"?";
            // line 178
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => ($context["total_pages"] ?? null), "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
            yield "\"
                    data-children-url-parameters=\"";
            // line 179
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Twig\Extension\CoreExtension::urlencode(["category" => ($context["category_id"] ?? null), "filter" => ($context["filter"] ?? null), "page" => ($context["total_pages"] ?? null), "sort_strategy" => ($context["sort_strategy"] ?? null)]), "html", null, true);
            yield "\"
                    data-pagination-item
                    aria-label=\"";
            // line 181
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Last page"), "html", null, true);
            yield "\"
                    ";
            // line 182
            yield (((($context["current_page"] ?? null) >= ($context["total_pages"] ?? null))) ? ("aria-disabled=\"true\"") : (""));
            yield "
                >
                    <i class=\"ti ti-chevrons-right\"></i>
                </a>
            </li>
        </ul>
    </nav>
";
        }
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "components/helpdesk_forms/service_catalog_items.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  384 => 182,  380 => 181,  375 => 179,  371 => 178,  365 => 175,  357 => 170,  353 => 169,  348 => 167,  344 => 166,  337 => 163,  334 => 161,  328 => 160,  322 => 156,  319 => 155,  316 => 154,  313 => 153,  310 => 152,  308 => 151,  302 => 148,  297 => 146,  292 => 144,  288 => 143,  281 => 140,  278 => 139,  273 => 138,  264 => 131,  260 => 130,  255 => 128,  251 => 127,  245 => 124,  237 => 119,  233 => 118,  228 => 116,  224 => 115,  217 => 112,  212 => 109,  209 => 108,  206 => 107,  203 => 106,  200 => 105,  198 => 104,  196 => 103,  193 => 101,  183 => 97,  178 => 95,  175 => 94,  172 => 93,  169 => 92,  166 => 91,  164 => 90,  161 => 89,  158 => 88,  155 => 87,  153 => 86,  150 => 85,  148 => 84,  143 => 83,  139 => 81,  137 => 79,  135 => 77,  128 => 72,  121 => 70,  119 => 68,  117 => 66,  113 => 65,  104 => 59,  98 => 56,  94 => 55,  87 => 51,  83 => 49,  81 => 48,  78 => 47,  75 => 46,  72 => 45,  68 => 43,  66 => 41,  64 => 39,  61 => 38,  56 => 37,  53 => 36,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "components/helpdesk_forms/service_catalog_items.html.twig", "D:\\xampp\\htdocs\\glpi\\templates\\components\\helpdesk_forms\\service_catalog_items.html.twig");
    }
}
