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

/* components/form/flags.html.twig */
class __TwigTemplate_e82fa5b03e4cc3c0e7579c146f2b2421 extends Template
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
        $context["flags"] = ["have_serial" => __("Serial"), "have_parallel" => __("Parallel"), "have_usb" => __("USB"), "have_ethernet" => __("Ethernet"), "have_wifi" => __("Wifi"), "have_micro" => __("Microphone"), "have_speaker" => __("Speakers"), "have_subd" => __("Sub-D"), "have_bnc" => __("BNC"), "have_dvi" => __("DVI"), "have_pivot" => __("Pivot"), "have_hdmi" => __("HDMI"), "have_displayport" => __("DisplayPort"), "have_headset" => __("Headset"), "have_hp" => __("Speaker")];
        // line 50
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["flags"] ?? null));
        foreach ($context['_seq'] as $context["field"] => $context["label"]) {
            // line 51
            yield "   ";
            if ((($tmp = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "isField", [$context["field"]], "method", false, false, false, 51)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                // line 52
                yield "      <div class=\"m-2\">
         <label class=\"form-check\">
            <input type=\"hidden\" name=\"";
                // line 54
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["field"], "html", null, true);
                yield "\" value=\"0\" />
            <input class=\"form-check-input\"
                   type=\"checkbox\"
                   name=\"";
                // line 57
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["field"], "html", null, true);
                yield "\"
                   ";
                // line 58
                if (((($_v0 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 58)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0[$context["field"]] ?? null) : null) == 1)) {
                    yield "checked=\"checked\"";
                }
                // line 59
                yield "                   value=\"1\" />
            <span class=\"form-check-label\">
               ";
                // line 61
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["label"], "html", null, true);
                yield "
            </span>
         </label>
      </div>
   ";
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['field'], $context['label'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "components/form/flags.html.twig";
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
        return array (  76 => 61,  72 => 59,  68 => 58,  64 => 57,  58 => 54,  54 => 52,  51 => 51,  47 => 50,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "components/form/flags.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\components\\form\\flags.html.twig");
    }
}
