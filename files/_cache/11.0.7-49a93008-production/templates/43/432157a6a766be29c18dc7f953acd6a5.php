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

/* pages/tools/find_available_reservation.html.twig */
class __TwigTemplate_e8f71467e18c38c331283b40650cae4e extends Template
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
        $context["params"] = ["target" => $this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeSearchPath("ReservationItem"), "canedit" => true, "candel" => false, "addbuttons" => ["submit" => ["text" => _x("button", "Search"), "btn_class" => "btn-primary"], "cancel" => ["type" => "button", "text" => _x("button", "Cancel"), "btn_class" => "btn-outline-secondary", "onclick" => "\$('#viewresasearch').toggleClass('d-none');\$('#makesearch').toggleClass('d-none')"]]];
        // line 50
        yield "
";
        // line 51
        $macros["fields"] = $this->macros["fields"] = $this->load("components/form/fields_macros.html.twig", 51)->unwrap();
        // line 52
        $macros["inputs"] = $this->macros["inputs"] = $this->load("components/form/basic_inputs_macros.html.twig", 52)->unwrap();
        // line 53
        yield "
<div class=\"asset mb-3\">
    <form action=\"";
        // line 55
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeSearchPath("ReservationItem"), "html", null, true);
        yield "\" method=\"post\">
        <input type=\"hidden\" name=\"_glpi_csrf_token\" value=\"";
        // line 56
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Session::getNewCSRFToken(), "html", null, true);
        yield "\"/>
        <div class=\"d-flex flex-wrap\">
            <div class=\"col-12 col-xxl-12 flex-column\">
                <div class=\"row flex-row\">
                    ";
        // line 60
        yield $macros["fields"]->getTemplateForMacro("macro_largeTitle", $context, 60, $this->getSourceContext())->macro_largeTitle(...[__("Find a free item in a specific period")]);
        yield "
                    ";
        // line 61
        yield $macros["fields"]->getTemplateForMacro("macro_datetimeField", $context, 61, $this->getSourceContext())->macro_datetimeField(...["reserve[begin]", (($_v0 = (($_v1 = ($context["_post"] ?? null)) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["reserve"] ?? null) : null)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["begin"] ?? null) : null), __("Start date"), ["maybeempty" => false]]);
        // line 63
        yield "

                    ";
        // line 65
        $context["duration"] = (CoreExtension::getAttribute($this->env, $this->source, $this->extensions['Twig\Extension\CoreExtension']->convertDate((($_v2 = (($_v3 = ($context["_post"] ?? null)) && is_array($_v3) || $_v3 instanceof ArrayAccess ? ($_v3["reserve"] ?? null) : null)) && is_array($_v2) || $_v2 instanceof ArrayAccess ? ($_v2["end"] ?? null) : null)), "getTimestamp", [], "method", false, false, false, 65) - CoreExtension::getAttribute($this->env, $this->source, $this->extensions['Twig\Extension\CoreExtension']->convertDate((($_v4 = (($_v5 = ($context["_post"] ?? null)) && is_array($_v5) || $_v5 instanceof ArrayAccess ? ($_v5["reserve"] ?? null) : null)) && is_array($_v4) || $_v4 instanceof ArrayAccess ? ($_v4["begin"] ?? null) : null)), "getTimestamp", [], "method", false, false, false, 65));
        // line 66
        yield "                    ";
        $context["default_delay"] = (Twig\Extension\CoreExtension::round(((($context["duration"] ?? null) / $this->extensions['Glpi\Application\View\Extension\ConfigExtension']->config("time_step")) / Twig\Extension\CoreExtension::constant("MINUTE_TIMESTAMP")), 0, "floor") * ($this->extensions['Glpi\Application\View\Extension\ConfigExtension']->config("time_step") * Twig\Extension\CoreExtension::constant("MINUTE_TIMESTAMP")));
        // line 67
        yield "                    ";
        yield $macros["fields"]->getTemplateForMacro("macro_dropdownTimestampField", $context, 67, $this->getSourceContext())->macro_dropdownTimestampField(...["reserve[_duration]", ($context["default_delay"] ?? null), __("Duration"), ["min" => 0, "max" => (48 * Twig\Extension\CoreExtension::constant("HOUR_TIMESTAMP")), "emptylabel" => __("Specify an end date")]]);
        // line 71
        yield "
                    ";
        // line 72
        $context["date_end_field"] = new Markup("                    <div id=\"date_end\"></div>
                    ", $this->env->getCharset());
        // line 75
        yield "                    ";
        yield $macros["fields"]->getTemplateForMacro("macro_htmlField", $context, 75, $this->getSourceContext())->macro_htmlField(...["", ($context["date_end_field"] ?? null), __("End date"), ["add_field_class" => "date_end_field d-none"]]);
        // line 77
        yield "
                    <script>
                        \$(() => {
                            \$('select[name=\"reserve[_duration]\"]').on('change', (e) => {
                                const value = \$(e.target).val();

                                if (parseInt(value) === 0) {
                                    \$('#date_end').load('";
        // line 84
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\RoutingExtension']->path("ajax/planningend.php"), "html", null, true);
        yield "', {
                                        duration: value,
                                        end: '";
        // line 86
        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($_v6 = (($_v7 = ($context["_post"] ?? null)) && is_array($_v7) || $_v7 instanceof ArrayAccess ? ($_v7["reserve"] ?? null) : null)) && is_array($_v6) || $_v6 instanceof ArrayAccess ? ($_v6["end"] ?? null) : null), "html", null, true);
        yield "',
                                        name: 'reserve[end]',
                                    }).closest('.date_end_field').removeClass('d-none');
                                } else {
                                    \$('#date_end').closest('.date_end_field').addClass('d-none');
                                }
                            });
                        });
                    </script>

                    ";
        // line 96
        yield $macros["fields"]->getTemplateForMacro("macro_dropdownArrayField", $context, 96, $this->getSourceContext())->macro_dropdownArrayField(...["reservation_types", (($_v8 = ($context["_post"] ?? null)) && is_array($_v8) || $_v8 instanceof ArrayAccess ? ($_v8["reservation_types"] ?? null) : null), ($context["reservation_types"] ?? null), __("Item type"), ["display_emptychoice" => true]]);
        // line 98
        yield "

                    ";
        // line 100
        yield $macros["fields"]->getTemplateForMacro("macro_dropdownField", $context, 100, $this->getSourceContext())->macro_dropdownField(...["Location", "locations_id", ($context["default_location"] ?? null), __("Item location"), ["entity" => $this->extensions['Glpi\Application\View\Extension\SessionExtension']->session("glpiactiveentities")]]);
        // line 102
        yield "
                </div>
                <div class=\"d-flex flex-row-reverse\">
                    ";
        // line 105
        yield $macros["inputs"]->getTemplateForMacro("macro_submit", $context, 105, $this->getSourceContext())->macro_submit(...["submit", _x("button", "Search")]);
        yield "
                </div>
            </div>
        </div>
    </form>
</div>
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "pages/tools/find_available_reservation.html.twig";
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
        return array (  136 => 105,  131 => 102,  129 => 100,  125 => 98,  123 => 96,  110 => 86,  105 => 84,  96 => 77,  93 => 75,  90 => 72,  87 => 71,  84 => 67,  81 => 66,  79 => 65,  75 => 63,  73 => 61,  69 => 60,  62 => 56,  58 => 55,  54 => 53,  52 => 52,  50 => 51,  47 => 50,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "pages/tools/find_available_reservation.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\pages\\tools\\find_available_reservation.html.twig");
    }
}
