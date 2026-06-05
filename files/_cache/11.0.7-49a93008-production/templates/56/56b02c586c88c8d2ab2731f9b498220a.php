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

/* __string_template__e57896dd6056e893ede45cab3f56b362 */
class __TwigTemplate_487ac3857b7faf5301a48f757d84c104 extends Template
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
        // line 1
        yield "            ";
        if ((($tmp =  !($context["reserve"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 2
            yield "                <div id=\"makesearch\" class=\"text-center mb-3\">
                    <a class=\"btn btn-secondary\" href=\"";
            // line 3
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\RoutingExtension']->path("front/reservation.php?reservationitems_id=0"), "html", null, true);
            yield "\">
                        <i class=\"";
            // line 4
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeIcon("Reservation"), "html", null, true);
            yield " me-2\"></i>";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["view_calendar_label"] ?? null), "html", null, true);
            yield "
                    </a>
                    <button type=\"button\" class=\"btn btn-secondary mw-100 d-inline-block text-truncate\" onClick=\"\$('#viewresasearch').toggleClass('d-none');\$('#makesearch').toggleClass('d-none')\">
                        <i class=\"ti ti-search me-2\"></i>";
            // line 7
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["find_free_item_label"] ?? null), "html", null, true);
            yield "
                    </button>
                </div>
                <div id=\"viewresasearch\" class=\"d-none text-center\">
            ";
        }
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "__string_template__e57896dd6056e893ede45cab3f56b362";
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
        return array (  60 => 7,  52 => 4,  48 => 3,  45 => 2,  42 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "__string_template__e57896dd6056e893ede45cab3f56b362", "");
    }
}
