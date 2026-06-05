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

/* pages/admin/helpdesk_home_config_tiles.html.twig */
class __TwigTemplate_1a0af9630c401652009964d3535765af extends Template
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
        $context["editable"] = ((array_key_exists("editable", $context)) ? (Twig\Extension\CoreExtension::default(($context["editable"] ?? null), false)) : (false));
        // line 34
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["tiles"] ?? null));
        $context['_iterated'] = false;
        foreach ($context['_seq'] as $context["_key"] => $context["tile"]) {
            // line 35
            yield "    <section
        class=\"col-12 col-lg-6 col-xl-4 d-flex-soft ";
            // line 36
            yield (((($tmp = ($context["editable"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ("pointer-events-none") : (""));
            yield "\"
        aria-label=\"";
            // line 37
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["tile"], "getTitle", [], "method", false, false, false, 37), "html", null, true);
            yield "\"
        ";
            // line 38
            if ((($tmp = ($context["editable"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                // line 39
                yield "            data-glpi-draggable-item
            data-glpi-helpdesk-config-tile-container
            data-glpi-helpdesk-config-action-show-edit-form
            data-bs-toggle=\"offcanvas\"
            data-bs-target=\"#tile-form-offcanvas\"
            data-testid=\"config-tile\"
        ";
            }
            // line 46
            yield "    >
        <div
            ";
            // line 48
            if ((($tmp = ($context["editable"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                // line 49
                yield "                ";
                $context["item_tile_id"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["tiles_manager"] ?? null), "getItemTileForTile", [$context["tile"]], "method", false, false, false, 49), "getID", [], "method", false, false, false, 49);
                // line 50
                yield "                data-glpi-helpdesk-config-tile
                data-glpi-helpdesk-config-tile-id=\"";
                // line 51
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["tile"], "getDatabaseId", [], "method", false, false, false, 51), "html", null, true);
                yield "\"
                data-glpi-helpdesk-config-tile-itemtype=\"";
                // line 52
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(get_class($context["tile"]), "html", null, true);
                yield "\"
                data-glpi-helpdesk-config-item-tile-id=\"";
                // line 53
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["item_tile_id"] ?? null), "html", null, true);
                yield "\"
                data-glpi-helpdesk-config-tile-sortable
            ";
            }
            // line 56
            yield "            class=\"card rounded my-2 flex-grow-1 ";
            yield (((($tmp = ($context["editable"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ("cursor-pointer") : (""));
            yield "\"
        >
            <section class=\"card-body\">
                <div class=\"d-flex\">
                    <div class=\"aspect-ratio-1\">
                        ";
            // line 61
            yield $this->extensions['Glpi\Application\View\Extension\IllustrationExtension']->renderIllustration(CoreExtension::getAttribute($this->env, $this->source, $context["tile"], "getIllustration", [], "method", false, false, false, 61), 70);
            yield "
                    </div>
                    <div class=\"ms-4 w-100\">
                        <div class=\"d-flex w-100\">
                            <h2 class=\"card-title mb-2 text-break\">
                                ";
            // line 66
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["tile"], "getTitle", [], "method", false, false, false, 66), "html", null, true);
            yield "
                            </h2>

                            ";
            // line 69
            if ((($tmp = ($context["editable"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                // line 70
                yield "                                <i
                                    class=\"ti ti-grip-horizontal cursor-grab ms-auto opacity-50\"
                                    data-glpi-helpdesk-config-tile-handle
                                    draggable=\"true\"
                                ></i>
                            ";
            }
            // line 76
            yield "                        </div>
                        <div class=\"text-secondary remove-last-tinymce-margin\">
                            ";
            // line 78
            yield $this->extensions['Glpi\Application\View\Extension\DataHelpersExtension']->getSafeHtml(CoreExtension::getAttribute($this->env, $this->source, $context["tile"], "getDescription", [], "method", false, false, false, 78));
            yield "
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
";
            $context['_iterated'] = true;
        }
        // line 85
        if (!$context['_iterated']) {
            // line 86
            yield "    ";
            // line 88
            yield "    ";
            if ((($tmp =  !($context["editable"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                // line 89
                yield "        <span class=\"text-muted\">
            ";
                // line 90
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("There are no tiles defined for this item."), "html", null, true);
                yield "
        </span>
    ";
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['tile'], $context['_parent'], $context['_iterated']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 94
        yield "
";
        // line 95
        if ((($tmp = ($context["editable"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 96
            yield "    <div
        role=\"button\"
        aria-label=\"";
            // line 98
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Add tile"), "html", null, true);
            yield "\"
        data-bs-toggle=\"offcanvas\"
        data-bs-target=\"#tile-form-offcanvas\"
        data-glpi-helpdesk-config-action-new-tile
        class=\"col-12 col-lg-6 col-xl-4 d-flex-soft opacity-80 cursor-pointer opacity-100-hover min-height-110 pointer-events-none\"
    >
        <div class=\"card rounded my-2 flex-grow-1 border-dashed\">
            <div class=\"card-body d-flex justify-content-center\">
                <div class=\"d-flex align-items-center\">
                    <i class=\"ti ti-plus me-1\"></i>
                    <span class=\"fs-3\">";
            // line 108
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Add tile"), "html", null, true);
            yield "</span>
                </div>
            </div>
        </div>
    </div>
";
        }
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "pages/admin/helpdesk_home_config_tiles.html.twig";
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
        return array (  191 => 108,  178 => 98,  174 => 96,  172 => 95,  169 => 94,  159 => 90,  156 => 89,  153 => 88,  151 => 86,  149 => 85,  137 => 78,  133 => 76,  125 => 70,  123 => 69,  117 => 66,  109 => 61,  100 => 56,  94 => 53,  90 => 52,  86 => 51,  83 => 50,  80 => 49,  78 => 48,  74 => 46,  65 => 39,  63 => 38,  59 => 37,  55 => 36,  52 => 35,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "pages/admin/helpdesk_home_config_tiles.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\pages\\admin\\helpdesk_home_config_tiles.html.twig");
    }
}
